import React, {useRef, useEffect} from 'react'
import clsx from 'clsx'

// Thư mục
import styles from './Input.module.scss'

function InputText({
  id,
  textLabel,
  inputForm,
  setInputForm,
  checkInput,
  type,
  isNumber,
  name,
}) {
  const handleChange = (e) => {
    let {name, value} = e.target
    if (isNumber) {
      setInputForm({
        ...inputForm,
        [name]: Number(value),
      })
    } else setInputForm({...inputForm, [name]: value})
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
      />
    </div>
  )
}

export default InputText
