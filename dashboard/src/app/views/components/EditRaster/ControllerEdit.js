import {memo} from 'react'
import clsx from 'clsx'

import images from '../../../constants/images'
import style from './EditRaster.module.scss'

function ControllerEdit({onDeccSize, onIncSize, size}) {
  return (
    <div className={clsx([style.controlEdit])}>
      <h4>Tùy chỉnh</h4>
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
