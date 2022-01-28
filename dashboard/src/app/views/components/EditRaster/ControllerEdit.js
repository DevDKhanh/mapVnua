import React, {memo, useState} from 'react'
import clsx from 'clsx'

import images from '../../../constants/images'
import style from './EditRaster.module.scss'
import {Input, LabelInput} from '../Map/element.js'

function ControllerEdit({onDeccSize, onIncSize, size, step}) {
  const [isEdit, setIsEdit] = useState(false)

  function handleClickClose() {
    setIsEdit(!isEdit)
  }

  return (
    <div
      className={clsx(
        {[style.controlEdit]: !isEdit},
        {[style.controlEditClose]: isEdit}
      )}
    >
      <h4>Tùy chỉnh</h4>
      <GroupStep label='Step' stepInfo={step} isEdit />
      <GroupControl
        title='Tăng - giảm chiều cao ảnh'
        onDeccSize={() => onDeccSize(true)}
        onIncSize={() => onIncSize(true)}
        size={size.h}
      />
      <GroupControl
        title='Tăng - giảm chiều rộng ảnh'
        onDeccSize={() => onDeccSize()}
        onIncSize={() => onIncSize()}
        size={size.w}
      />
      <div
        id='wrapperArrow'
        className={style.wrapperArrow}
        onClick={handleClickClose}
      >
        <img src={images.btnArrow} className={clsx({[style.imgEdit]: true})} />
      </div>
    </div>
  )
}

function GroupStep({label, stepInfo}) {
  const handleChangeStep = (e) => {
    stepInfo.setStep(Number(e.target.value))
  }

  return (
    <div>
      <LabelInput display='block' htmlFor='step'>
        {label}
      </LabelInput>
      <Input
        type='number'
        value={stepInfo.step}
        id='step'
        onChange={handleChangeStep}
      />
    </div>
  )
}

function GroupControl({title, onIncSize, onDeccSize, size}) {
  return (
    <div className={style.groupEdit}>
      <p>{title}</p>
      <div className={style.groupControl}>
        <button className={style.btn} onClick={onDeccSize}>
          <img src={images.btnDec} />
        </button>
        <span className={style.value}>{parseFloat(size).toFixed(2)}</span>
        <button className={style.btn} onClick={onIncSize}>
          <img src={images.btnInc} />
        </button>
      </div>
    </div>
  )
}

export default memo(ControllerEdit)
