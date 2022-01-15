import React from 'react'

// Thư mục
import styles from './Avatar.module.scss'
import images from '../../../constants/images'

function Avatar({size}) {
  const styleSize = {
    width: `${size}px`,
    height: `${size}px`,
  }
  return (
    <div className={styles.wrapper_avatar}>
      <img style={styleSize} src={images.imageAdmin} alt='' />
    </div>
  )
}

export default Avatar
