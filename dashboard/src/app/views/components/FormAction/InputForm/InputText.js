import clsx from 'clsx'
import React from 'react'

// Thư mục
import styles from './Input.module.scss'

function InputText({
  id,
  textLabel,
  inputForm,
  setInputForm,
  checkInput,
  type,
  name,
  disable,
}) {
  const handleChange = (e) => {
    let {name, value} = e.target

    setInputForm({...inputForm, [name]: value})
  }

  return (
    <div className={clsx('form-group', styles.wrapperInputText)}>
      {textLabel && <label htmlFor={id}>{textLabel}</label>}
      <input
        value={inputForm[name]}
        name={name}
        onChange={handleChange}
        type={type ? type : 'text'}
        className={clsx(
          'form-control',
          !inputForm[name] && checkInput && 'is-invalid'
        )}
        id={id}
        placeholder={textLabel}
        disabled={disable}
      />
    </div>
  )
}

export default InputText
