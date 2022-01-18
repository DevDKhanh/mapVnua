import React from 'react'
import clsx from 'clsx'

// Thư mục
import styles from './Input.module.scss'

function InputDeps({
  id,
  textLabel,
  inputForm,
  setInputForm,
  arrayDeps,
  isNumber,
  name,
}) {
  const handleChange = (e) => {
    let {name, value} = e.target
    if (value) {
      if (isNumber) {
        setInputForm({...inputForm, [name]: Number(value.trim())})
        if (value === 'Có') {
          setInputForm({...inputForm, [name]: 1})
        }
        if (value === 'Không') {
          setInputForm({...inputForm, [name]: 0})
        }
      } else setInputForm({...inputForm, [name]: value.trim()})
    } else delete inputForm[name]
  }
  return (
    <div className={clsx('form-group', styles.wrapperInputText)}>
      <label htmlFor={id}>{textLabel}</label>
      <select
        className='form-control'
        id={id}
        name={name}
        onClick={handleChange}
      >
        {arrayDeps.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default InputDeps
