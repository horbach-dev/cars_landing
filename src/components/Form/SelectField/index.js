import React, {useState, useEffect, useRef} from "react";
import {Select} from "antd";
import classes from 'classnames';
import style from "./styles.module.css";

const {Option} = Select;

const SelectField = ({
                       isBlack,
                       label,
                       onChangeValue,
                       placeholder,
                       disabled,
                       field,
                       form,
                       items,
                       isWow,
                     }) => {
  const selectRef = useRef(null)
  const [isFocused, setFocused] = useState(false)
  const [isWowed, setWow] = useState(false)

  const handleDropdownVisibleChange = isOpen => {
      document.getElementsByTagName('body')[0].style = `overflow: ${isOpen ? 'hidden' : 'auto'}`
  }

  const handleSelect = () => {
    selectRef &&
    selectRef.current &&
    selectRef.current.blur &&
    setTimeout(() => selectRef.current.blur(), 100)
  }

  const handleChangeValue = (value) => {
    form.setFieldValue(field.name, value ? value : "");
    onChangeValue && onChangeValue(value, form.setFieldValue);
  }

  const handleClear = () => {
    form.setFieldValue(field.name, "");
  }

  const handleInputChange = (value) => {
    if (value) {
      const strValue = value.toString()
      const yes = items.find(i => i.value.toLowerCase() === strValue.toLowerCase())
      if (yes) {
        form.setFieldValue(field.name, yes.value ? yes.value : "");
        onChangeValue && onChangeValue(yes.value, form.setFieldValue);
      }
    }
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  const error = form.errors && form.errors[field.name] ? form.errors[field.name] : "";

  useEffect(() => {
    if (isWow) {
      setTimeout(() => setWow(true), 500)
      setWow(false)
    }
  }, [isWow])

  return (
    <div className={classes(style.wrap, isBlack && 'black-field', isBlack && style.black)}>
      {isWow && <WowAnimation/>}
      {label && <span className={style.label}>{label}</span>}
      <div className={classes(style.selectWrap, isWowed && style.isWow)}>
        {placeholder && !isFocused && !field.value && <span className={style.placeholder}>{placeholder}</span>}
        <Select
          ref={selectRef}
          showSearch
          allowClear
          style={{width: "100%"}}
          optionFilterProp="children"
          onChange={handleChangeValue}
          onInputKeyDown={handleInputChange}
          onSearch={handleInputChange}
          onFocus={handleFocus}
          onSelect={handleSelect}
          onBlur={handleBlur}
          onDropdownVisibleChange={handleDropdownVisibleChange}
          disabled={disabled}
          notFoundContent="Не найдено"
          value={field.value}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {items.map((i) => (
            <Option key={i.value} value={i.value}>
              {i.label}
            </Option>
          ))}
        </Select>
        {field.value && (
          <div className={style.clear} onClick={handleClear}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill={isBlack ? '#ffffff' : '#555555'}
                    d="M7.05022 7.05028C6.65969 7.4408 6.65969 8.07397 7.05022 8.46449L10.5858 12L7.05023 15.5356C6.6597 15.9261 6.6597 16.5593 7.05023 16.9498C7.44075 17.3403 8.07392 17.3403 8.46444 16.9498L12 13.4142L15.5355 16.9498C15.926 17.3403 16.5592 17.3403 16.9497 16.9498C17.3402 16.5592 17.3402 15.9261 16.9497 15.5356L13.4142 12L16.9497 8.46449C17.3402 8.07397 17.3402 7.4408 16.9497 7.05028C16.5592 6.65976 15.926 6.65976 15.5355 7.05028L12 10.5858L8.46443 7.05028C8.07391 6.65975 7.44074 6.65975 7.05022 7.05028Z"/>
            </svg>
          </div>
        )}
      </div>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};

const WowAnimation = () => {
  const [isWow, setWow] = useState(false)

  useEffect(() => {
    setTimeout(() => setWow(true), 500)
  }, [])

  return <div className={classes(style.poof, isWow && style.poofAction)}/>
}

export default SelectField;
