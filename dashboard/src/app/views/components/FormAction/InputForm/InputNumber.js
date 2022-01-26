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
  name,
}) {
  const handleChange = (event) => {
    let {name, value} = event.target
    setInputForm({...inputForm, [name]: value})
  }

  return (
    <div className={clsx('form-group', styles.wrapperInputText)}>
      <label htmlFor={id}>{textLabel}:</label>
      <input
        name={name}
        onChange={handleChange}
        value={inputForm[name] || ''}
        type='number'
        step={0.5}
        min={0}
        className={clsx(
          'form-control',
          !inputForm[name] && checkInput && 'is-invalid'
        )}
        id={id}
        placeholder={textLabel}
      />
    </div>
  )
}

export default InputNumber
