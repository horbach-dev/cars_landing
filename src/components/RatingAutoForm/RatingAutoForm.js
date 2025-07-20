import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import {sendTelegramMessage} from "../../utils/api";
import RatingAutoFormContent from "./RatingAutoFormContent";
import {FormError} from "../../utils/formError";
import CompletedScreen from "../CompletedScreen";

import styles from "./RatingAutoForm.module.css";

const template = {
  mark: '',
  model: '',
  year: '',
  price: 100,
  phone: '',
  name: ''
}

const RatingAutoForm = ({ complete, handleComplete, mark }) => {
  const [init, setInit] = useState(template)

  useEffect(() => {
    const storage = localStorage.getItem('firstForm')
    setInit(storage ? JSON.parse(storage) : template)
  }, []);

  const handleSubmit = (values, {setSubmitting, setErrors}) => {
    sendTelegramMessage(values)
        .then(res => {
          if (res.status === 200) {
            handleComplete()
            localStorage.removeItem('firstForm')
          }
        }).catch(e => {
      if (e instanceof FormError) {
        setErrors(e.errors);
      } else {
        alert('Непредвиденная ошибка на сервере, пожалуйста, свяжитесь с нами по телефону!')
      }
    }).finally(() => setSubmitting(false))
  };

  return (
    <div id='rating-form' className={styles.form}>
      <Formik
        enableReinitialize
        initialValues={init}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return <RatingAutoFormContent {...props} mark={mark} />;
        }}
      </Formik>
      <CompletedScreen complete={complete}/>
    </div>
  );
};

export default RatingAutoForm;
