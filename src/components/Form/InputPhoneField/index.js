import React, {useCallback, useState} from "react";
import { Input } from "antd";
import ReactInputMask from 'react-input-mask';

import style from "./styles.module.css";
import classes from "classnames";

const InputPhoneFiled = ({
  isBlack,
  label,
  onChangeValue,
  placeholder,
  disabled,
  field,
  form,
}) => {
  const [isFocused, setFocused] = useState(false)

  const handleChangeValue = useCallback(
    (e) => {
      form.setFieldValue(field.name, e.target.value);
      onChangeValue && onChangeValue(e.target.value);
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
      <ReactInputMask
          value={field.value}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeValue}
          mask="+375 (99) 999 99 99"
      >
        { (inputProps) => <Input {...inputProps} /> }
      </ReactInputMask>
      </div>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};

export default InputPhoneFiled;
