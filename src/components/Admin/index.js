import React, {useState, useEffect} from 'react';
import {Button, Spin} from "antd";
import classnames from "classnames";
import api from "../../utils/api";
import {urlBase64ToUint8Array, PUBLIC_VAPID_KEY} from "./config";
import {subscribe, connectToWebsocket} from "../../utils/websocket";

import style from './style.module.scss'
import AdminTable from "./AdminTable";

let sound = new Audio();

if (sound.canPlayType("audio/wav") !== "") {
  sound.src = "intro.wav";
} else if (sound.canPlayType("audio/ogg") !== "") {
  sound.src = "intro.ogg";
}

const Admin = ({ closeAdmin }) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isModal, setModal] = useState(true)

  const handleNewCar = (item) => {
    item.isNew = true
    setData(prev => {
      if (prev.find(i => i._id === item._id)) return prev
      return [item, ...prev]
    })
    sound.play();
  }

  const handleFirstClick = () => {
    sound.play()
    setModal(false)

    setTimeout(() => {
      sound = new Audio();
      if (sound.canPlayType("audio/wav") !== "") {
        sound.src = "tap.wav";
      } else if (sound.canPlayType("audio/ogg") !== "") {
        sound.src = "tap.ogg";
      }
    }, 100)
  }

  useEffect(() => {
    if (localStorage.getItem('admin_token') === 'tokenizer') {

      loadData()
      connectToWebsocket('tokenizer').then(() => {
        subscribe('new_lead', handleNewCar);
      })

    }

    const body = document.querySelector('body')
      body.style.overflow = 'hidden'

    return () => body.style.overflow = 'auto'
  }, [])

  const loadData = () => {
    setLoading(true)
    api.getAllCars().ready.then(res => {
      res.data && setData(res.data)
    }).finally(() => {
      setLoading(false)

      // Check for service worker
      if ('serviceWorker' in navigator) {
        send().catch(e => console.error(e))
      }

      // Register SW, Register Push, Send Push
      async function send() {
        console.log('Registering SW...');
        const register = await navigator.serviceWorker.register('./worker.js', {
          scope: '/'
        });
        console.log('SW Registered');

        // Register Push
        console.log('Registering Push...');
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
        });
        console.log('Push Registered...');

        // Send Push Notification
        console.log('Sending Push...');

        api.PushSubscribe(subscription);

        console.log('Push Send...');


      }

    })
  }

  const dataAccepted = data.filter(i => i.accepted)
  const dataUnaccepted = data.filter(i => !i.accepted)

  return (
    <div className={style.adminWrap}>
      <Button className={style.close} onClick={closeAdmin}>Закрыть</Button>
      <div className={classnames(style.adminWelcome, !isModal && style.hideModal)}>
        <div className={style.modal}>
          <p>Ты вошел в мониторинг, пожалуйста подтверди что хочешь им воспользоваться.</p>
          <Button onClick={handleFirstClick} type="primary">Подтвердить</Button>
        </div>
      </div>
      <div className={style.admin}>
        <div className={style.adminHeader}>
          <div className={style.adminHeaderLeft}>
            <p>Всего заявок: <span>{data.length}</span></p>
            <p>Заявок принято: <span>{dataAccepted.length}</span></p>
          </div>
          <div className={style.adminHeaderRight}>
            <h3>Промежуточный фильтр</h3>
            <p>Действует простое правило 10-ти секунд.
              В режиме реального времени приходят заявки на оценку авто,
              у администратора есть 10 секунд что-бы приостановить отправку заявки на AMOCRM </p>
          </div>
        </div>
        {isLoading ? (
          <Spin className={style.spin}/>
        ) : (
          <AdminTable
            data={data}
            dataAccepted={dataAccepted}
            dataUnaccepted={dataUnaccepted}
            setData={setData}
          />
        )}
      </div>
    </div>
  )
}

export default Admin;
