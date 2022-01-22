import React from 'react'
import clsx from 'clsx'

// Thư mục
import styles from './Input.module.scss'

function InputFile({id, textLabel, name, inputForm, setInputForm, checkInput}) {
  // console.log(inputForm)
  const handleOnchange = (e) => {
    let {name} = e.target
    // console.log(e.target.files[0])
    name && setInputForm({...inputForm, [name]: e.target.files[0].name})
  }

  return (
    <div className={clsx('form-group', styles.wrapperInputText)}>
      <label htmlFor={id}>{textLabel}:</label>
      <div className={clsx('custom-file')}>
        <input
          name={name}
          type='file'
          className={clsx(
            'custom-file-input',
            !inputForm[name] && checkInput && 'is-invalid'
          )}
          id={id}
          accept='image/png, image/jpeg'
          onChange={handleOnchange}
        />
        <label className='custom-file-label' htmlFor={id}>
          {inputForm[name]}
        </label>
      </div>
    </div>
  )
}

export default InputFile
