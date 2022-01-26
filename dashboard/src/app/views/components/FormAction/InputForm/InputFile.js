import React from 'react'
import clsx from 'clsx'

// Thư mục
import styles from './Input.module.scss'

function InputFile({id, textLabel, name, inputForm, setInputForm, checkInput}) {
  const handleOnchange = (e) => {
    // console.log(inputForm[name])
    // console.log(inputForm[name].name)
    name && setInputForm({...inputForm, [name]: e.target.files[0]})
  }

  return (
    <div className={clsx('form-group', styles.wrapperInputText)}>
      <label htmlFor={id}>{textLabel}:</label>
      <div className={clsx('custom-file')}>
        <input
          name={name}
          type='file'
          accept='image/*'
          className={clsx(
            'custom-file-input',
            !inputForm[name] && checkInput && 'is-invalid'
          )}
          id={id}
          onChange={handleOnchange}
        />
        <label className='custom-file-label' htmlFor={id}>
          {typeof inputForm[name] === 'object'
            ? inputForm[name].name
            : inputForm[name]}
        </label>
      </div>
    </div>
  )
}

export default InputFile
