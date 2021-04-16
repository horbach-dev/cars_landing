import React, { useState, useEffect } from 'react';

import style from "./style.module.scss";
import {Button} from "antd";
import CardItemDate from './CardItemDate';
import classnames from "classnames";
import styles from "./style.module.scss";
import api from "../../utils/api";

const CardItem = ({item, setData}) => {
  const [isLost, setLost] = useState(false)

  const handleDelete = () => {
    api.removeCar(item._id).ready.then(res => {
      setData(prev => prev.filter(i => i._id !== res.data.deleted))
    })
  }

  const handleAccent = () => {
    api.handleAccept(item._id).ready.then(() => {
      setData(prev => prev.map(i => {
          if (i._id === item._id) {
            i.accepted = true
          }
          return i
        }))
    })
  }

  const isEnd = isLost || item.accepted

  return (
    <div key={item._id} className={classnames(style.card, !isLost && styles.isLost)}>
      <CardItemDate date={item.date} isEnd={isEnd} setLost={setLost} />
      <div className={style.cardItem}>Марка: <span>{item.mark}</span></div>
      <div className={style.cardItem}>Модель: <span>{item.model}</span></div>
      <div className={style.cardItem}>Год: <span>{item.year}</span></div>
      <div className={style.cardItem}>Цена: <span>${item.price}</span></div>
      <div className={style.cardItem}>Имя: <span>{item.name}</span></div>
      <div className={style.cardItem}>Телефон: <span>{item.phone}</span></div>
      <div className={style.actions}>
        <Button onClick={handleDelete} danger>{isEnd ? 'Удалить' : 'Отменить'}</Button>
        {!isEnd &&<Button onClick={handleAccent} type="primary">Принять</Button>}
      </div>
    </div>
  )
}

export default CardItem
