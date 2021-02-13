import React, { useState } from 'react';
import {Modal as Window} from "antd";
import {Formik} from "formik";
import ModalForm from "./ModalForm";
import api from "../../utils/api";
import styles from "./Modal.module.css";
import {FormError} from "../../utils/formError";


const Modal = ({isModalVisible, handleCancel}) => {
  const [isCompleted, setCompleted] = useState(false)

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    api.sendShortForm(values).ready.then(res => {
      if (res.data && res.data.name) {
        setCompleted(true)
      }
    }).catch(e => {
      if (e instanceof FormError) {
        setErrors(e.errors);
      }
    }).finally(() => setSubmitting(false))
  };

  return (
    <Window
      title={
        isCompleted ?
          'Ваши контакты отправлены!' :
          "Хотите узнать стоимость автомобиля?"
      }
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      closeIcon={<span/>}
    >
      <p className={styles.desc}>
        {!isCompleted ? <> Оставьте контактные данные <br/> и мы позвоним Вам в течение 10 минут.</> :
        <>Ваши контактные данные были отправлены в адресс нашей мониторинговой системы. <br/>
        Мы свяжемся с Вами как можно раньше!</>}
      </p>
      {!isCompleted && <Formik
        enableReinitialize
        initialValues={{ name: '', phone: '' }}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return <ModalForm {...props} />;
        }}
      </Formik>}
    </Window>
  )
}

export default Modal;
