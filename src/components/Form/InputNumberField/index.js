import React, { useCallback } from "react";
import { InputNumber } from "antd";
import style from "./styles.module.css";
import classes from "classnames";

const InputFiled = ({
  isBlack,
  label,
  onChangeValue,
  disabled,
  max,
  min,
  field,
  form,
}) => {
  const handleChangeValue = useCallback(
    (value) => {
      form.setFieldValue(field.name, value);
      onChangeValue && onChangeValue(value);
    },
    [form, field.name]
  );

  const error = form.errors[field.name] ? form.errors[field.name] : "";

  return (
    <div className={classes(style.wrap, isBlack && 'black-field', isBlack && style.black)}>
      {label && <span className={style.label}>{label}</span>}
      <InputNumber
        step={100}
        value={field.value}
        disabled={disabled}
        max={max}
        min={min}
        formatter={(value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        onChange={handleChangeValue}
      />
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};

export default InputFiled;
