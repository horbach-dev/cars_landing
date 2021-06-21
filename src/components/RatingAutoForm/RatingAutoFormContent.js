import React, {useState, useEffect} from "react";
import classnames from "classnames";
import {Field} from "formik";
import SelectField from "../../components/Form/SelectField";
import InputField from "../../components/Form/InputField";
import InputNumberField from "../../components/Form/InputNumberField";
import InputPhoneField from "../../components/Form/InputPhoneField";
import {cars} from "../../helpers/cars";
import {years} from "../../helpers/years";

import styles from "./RatingAutoForm.module.css";
import {Button} from "antd";

const RatingAutoFormContent = ({values, errors, setFieldValue, handleSubmit, dirty, isSubmitting, mark}) => {
  const [modelValues, setModelValues] = useState(
    (values && values.mark && cars[values.mark]) || []
  );
  const [wow, setWow] = useState(false);
  const marks = Object.keys(cars).map(i => ({label: i, value: i}));

  const handleChangeMark = (value, setValue) => setValue("model", "");

  useEffect(() => {
    if (mark) {
      getMark(mark)
    }
  }, [mark])

  const setDefault = (s) => setFieldValue('mark', s[0].toUpperCase() + s.slice(1))
  const setVal = (s) => setFieldValue('mark', s)

  const getMark = (mark) => {
    setWow(true)
    setTimeout(() => {
      if (mark === 'bmw') {
        return setVal('BMW')
      }
      if (mark === 'mercedes-benz') {
        return setVal('Mercedes-Benz')
      }
      if (mark === 'alfa-romeo') {
        return setVal('Alfa Romeo')
      }
      if (mark === 'land-rover') {
        return setVal('Land Rover')
      }
      setDefault(mark)
    }, 500)
  }

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
    }
  }, [values, dirty]);

  return (
    <form onSubmit={handleSubmit} className={classnames(styles.formAction, isSubmitting && styles.formActionSubmitting)}>
      <Field
        name="mark"
        label="Марка"
        placeholder='Ведите марку авто'
        items={marks}
        onChangeValue={handleChangeMark}
        component={SelectField}
        isWow={wow}
      />
      <Field
        name="model"
        label="Модель"
        placeholder='Укажите модель'
        items={modelValues}
        component={SelectField}
      />
      <Field
        name="year"
        label="Год"
        placeholder="Введите год авто"
        items={years}
        component={SelectField}
      />
      <Field
        name="price"
        label="Желаемая цена"
        component={InputNumberField}
        min={100}
      />
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
      <Button
        type="primary"
        htmlType="submit"
        disabled={isSubmitting || !!Object.keys(errors).length}
        loading={isSubmitting}
        onClick={handleSubmit}
        style={{width: '100%'}}
      >
        Оценить авто
      </Button>
    </form>
  );
};

export default RatingAutoFormContent;
