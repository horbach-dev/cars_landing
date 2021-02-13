import React, {useCallback, useState} from "react";
import { Input } from "antd";
import style from "./styles.module.css";
import classes from "classnames";

const InputFiled = ({
  isBlack,
  label,
  password,
  onChangeValue,
  placeholder,
  disabled,
  field,
  form,
}) => {
  const [isFocused, setFocused] = useState(false)

  const handleChangeValue = useCallback(
    (value) => {
      form.setFieldValue(field.name, value);
      onChangeValue && onChangeValue(value);
    },
    [form, field.name]
  );

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  const error = form.errors[field.name] ? form.errors[field.name] : "";

  return (
    <div className={classes(style.wrap, isBlack && 'black-field', isBlack && style.black)}>
      {label && <span className={style.label}>{label}</span>}
      <div className={style.inputWrap}>
      { placeholder && !isFocused && !field.value && <span className={style.placeholder}>{placeholder}</span> }
      {password ? (
        <Input.Password
          value={field.value}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => handleChangeValue(e.target.value)}
        />
      ) : (
        <Input
          value={field.value}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => handleChangeValue(e.target.value)}
        />
      )}
      </div>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};

export default InputFiled;
