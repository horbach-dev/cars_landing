import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import api from "../../utils/api";
import RatingAutoFormContent from "./RatingAutoFormContent";
import {FormError} from "../../utils/formError";

import styles from "./RatingAutoForm.module.css";
import CompletedScreen from "../CompletedScreen";

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
    api.sendForm(values).ready.then(res => {
      if (res.data && res.data.mark) {
        handleComplete()
        localStorage.removeItem('firstForm')
      }
    }).catch(e => {
      if (e instanceof FormError) {
        setErrors(e.errors);
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
