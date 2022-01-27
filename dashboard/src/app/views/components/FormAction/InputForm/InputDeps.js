import React from 'react'
import clsx from 'clsx'

// Thư mục
import styles from './Input.module.scss'

function InputDeps({id, textLabel, inputForm, setInputForm, arrayDeps, name}) {
  const handleCheckActive = (value) => {
    if (value === 'Có') {
      return 1
    } else if (value === 'Không') {
      return 0
    } else {
      return value
    }
  }

  const handleChange = (e) => {
    let {name, value} = e.target
    setInputForm({...inputForm, [name]: handleCheckActive(value)})
  }
  return (
    <div className={clsx('form-group', styles.wrapperInputText)}>
      <label htmlFor={id}>{textLabel}</label>
      <select
        className='form-control'
        id={id}
        name={name}
        onClick={handleChange}
        // value={inputForm[name]}
      >
        {arrayDeps.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default InputDeps
