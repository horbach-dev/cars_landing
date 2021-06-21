import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Field } from "formik";
import InputField from "../../components/Form/InputField";
import InputPhoneField from "../../components/Form/InputPhoneField";
import { Button } from "antd";

import styles from "./Modal.module.css";

const ModalForm = ({ values, handleSubmit, dirty, isSubmitting, errors }) => {

  useEffect(() => {
    if (values && typeof values === "object") {
      dirty && localStorage.setItem('firstForm', JSON.stringify(values))
    }
  }, [values, dirty]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={classnames(styles.formAction, isSubmitting && styles.formActionSubmitting)}>
        <div
          className={styles.fields}
        >
          <Field
            name="name"
            label="Ваше имя"
            placeholder="Введите имя"
            component={InputField}
          />
          <Field
            name="phone"
            label="Телефон"
            placeholder="Введите номер"
            component={InputPhoneField}
          />
        </div>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        onClick={handleSubmit}
        disabled={isSubmitting || !!Object.keys(errors).length}
      >
        Отправить заявку
      </Button>
    </form>
  );
};

export default ModalForm;
