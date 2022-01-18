import React, {useState} from 'react'
import clsx from 'clsx'
import InputColor from 'react-input-color'

//path of folder
import styles from './Input.module.scss'
import InputText from './InputText'

const InputColorPicker = ({
  textLabel,
  id,
  name,
  inputForm,
  setInputForm,
  checkInput,
}) => {
  return (
    <div className={clsx('form-group', styles.wrapper_input_color)}>
      <label htmlFor={id}>{textLabel}</label>
      <div className={styles.wrapper_input_picker}>
        <InputColor
          initialValue={inputForm[name]}
          onChange={(e) => setInputForm({...inputForm, [name]: e.hex})}
          placement='right'
        />
        <InputText
          id={id}
          inputForm={inputForm}
          name={name}
          setInputForm={setInputForm}
          checkInput={checkInput}
        />
      </div>
    </div>
  )
}

export default InputColorPicker
