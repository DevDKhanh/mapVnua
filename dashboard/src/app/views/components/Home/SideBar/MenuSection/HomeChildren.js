import React from 'react'

// path of folder
import styles from './MenuSection.module.scss'
import {Link} from 'react-router-dom'

const HomeChildren = ({icon, text, setIndexFocus}) => {
  const handleClickHome = () => {
    setIndexFocus()
  }

  return (
    <Link
      to={'.'}
      onClick={handleClickHome}
      className={styles.wrapper_menu_section_children}
    >
      {/* tab i */}
      {icon}
      <p>{text}</p>
    </Link>
  )
}

export default HomeChildren
