import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import classnames from "classnames";
import MainSectionFormContent from "./MainSectionFormContent";
import api, {sendTelegramMessage} from "../../../utils/api";

import styles from "./MainSectionForm.module.scss";
import {FormError} from "../../../utils/formError";
import CompletedScreen from "../../CompletedScreen";

const template = {mark: '', model: '', year: '', price: 100, name: '', phone: ''}

const MainSectionForm = ({ complete, handleComplete }) => {
  const [init, setInit] = useState(template)

  useEffect(() => {
    const storage = localStorage.getItem('firstForm')
    setInit(storage ? JSON.parse(storage) : template)
  }, []);

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    sendTelegramMessage(values)
        .then(res => {
          if (res.data && res.data.mark) {
            handleComplete()
            localStorage.removeItem('firstForm')
          }
        }).catch(e => {
      if (e instanceof FormError) {
        setErrors(e.errors);
      }
    }).finally(() => setSubmitting(false))

    // api.sendForm(values).ready.then(res => {
    //   if (res.data && res.data.mark) {
    //     handleComplete()
    //     localStorage.removeItem('firstForm')
    //   }
    // }).catch(e => {
    //   if (e instanceof FormError) {
    //     setErrors(e.errors);
    //   }
    // }).finally(() => setSubmitting(false))
  };

  return (
    <div className={styles.formWrapper}>
      <div className={classnames(styles.form, complete && styles.formCompleted)}>
        <p className="section-title">Оценка стоимости авто <span>за 5 минут</span></p>
        <div className={styles.formWrapper}>
          <p className={styles.formDesc}>
            Это поможет нам быстрее <br/> сделать вам предложение!
          </p>
          <Formik
            enableReinitialize
            initialValues={init}
            onSubmit={handleSubmit}
          >
            {(props) => {
              return <MainSectionFormContent {...props} />;
            }}
          </Formik>
        </div>
      </div>
      <div className={styles.completedScreenWrapper}>
        <CompletedScreen complete={complete} />
      </div>
    </div>
  );
};

export default MainSectionForm;
