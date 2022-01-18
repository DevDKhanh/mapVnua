import React from 'react'
import clsx from 'clsx'

// Thư mục
import styles from './Input.module.scss'

function InputNumber({
  id,
  textLabel,
  inputForm,
  setInputForm,
  checkInput,
  isNumber,
  name,
}) {
  const handleChange = (e) => {
    let {name, value} = e.target
    if (value) {
      if (isNumber) {
        setInputForm({...inputForm, [name]: Number(value.trim())})
      } else setInputForm({...inputForm, [name]: value.trim()})
    } else delete inputForm[name]
  }

  return (
    <div className={clsx('form-group', styles.wrapperInputText)}>
      <label htmlFor={id}>{textLabel}:</label>
      <input
        name={name}
        onChange={handleChange}
        type='number'
        className={clsx(
          'form-control',
          !inputForm[name] && checkInput && 'is-invalid'
        )}
        id={id}
        min={0}
        placeholder={textLabel}
      />
    </div>
  )
}

export default InputNumber
