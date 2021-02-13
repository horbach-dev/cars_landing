import React, {useState, useEffect} from "react";
import classnames from "classnames";
import {Field} from "formik";
import SelectField from "../../../components/Form/SelectField";
import InputField from "../../../components/Form/InputField";
import InputNumberField from "../../../components/Form/InputNumberField";
import InputPhoneField from "../../../components/Form/InputPhoneField";
import {cars} from "../../../helpers/cars";
import {years} from "../../../helpers/years";

import styles from "./MainSectionForm.module.scss";
import {Button} from "antd";

const MainSectionFormContent = ({values, errors, setFieldValue, handleSubmit, dirty, isSubmitting }) => {
  const [modelValues, setModelValues] = useState(
    (values && values.mark && cars[values.mark]) || []
  );
  const [isFullForm, setFullForm] = useState(false);
  const marks = Object.keys(cars).map((i) => ({label: i, value: i}));

  const handleChangeMark = (value, setValue) => setValue("model", "");

  useEffect(() => {
    if (values.mark) {
      setModelValues(cars[values.mark])
    } else {
      setFieldValue('model', '')
      setModelValues([])
    }
  }, [values.mark]);

  useEffect(() => {
    if (values && typeof values === "object") {
      dirty && localStorage.setItem('firstForm', JSON.stringify(values))
      if (values.mark && values.model && values.year) {
        setFullForm(true);
      }
    }
  }, [values, dirty]);

  return (
    <>
      <div className={classnames(styles.formAction, isSubmitting && styles.formActionSubmitting)}>
        <Field
          isBlack
          name="mark"
          label="Марка"
          placeholder='Ведите марку авто'
          items={marks}
          onChangeValue={handleChangeMark}
          component={SelectField}
        />
        <Field
          isBlack
          name="model"
          label="Модель"
          placeholder='Укажите модель'
          items={modelValues}
          component={SelectField}
        />
        <Field
          isBlack
          name="year"
          label="Год"
          placeholder="Введите год авто"
          items={years}
          component={SelectField}
        />
        <Field
          isBlack
          name="price"
          label="Желаемая цена"
          component={InputNumberField}
          min={100}
        />
        <div
          className={classnames(
            styles.otherFields,
            isFullForm && styles.otherFieldsActive
          )}
        >
          <Field
            isBlack
            name="name"
            label="Ваше имя"
            placeholder="Введите имя"
            component={InputField}
          />
          <Field
            isBlack
            name="phone"
            label="Телефон"
            placeholder="Введите номер"
            component={InputPhoneField}
          />
        </div>
      </div>
      <Button
        type="primary"
        disabled={isSubmitting || !!Object.keys(errors).length}
        loading={isSubmitting}
        onClick={handleSubmit}
      >
        Отправить заявку
      </Button>
    </>
  );
};

export default MainSectionFormContent;
