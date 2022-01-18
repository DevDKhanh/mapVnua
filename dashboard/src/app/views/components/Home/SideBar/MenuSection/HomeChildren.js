import React from 'react'
import {useDispatch} from 'react-redux'

// path of folder
import styles from './MenuSection.module.scss'
import {reqDisplay} from '../../../../../redux/action/action.componentDisplay'

const HomeChildren = ({icon, text}) => {
  const dispatch = useDispatch()

  const handleClickHome = () => {
    dispatch(
      reqDisplay({
        text: 'home',
      })
    )
  }

  return (
    <div
      onClick={handleClickHome}
      className={styles.wrapper_menu_section_children}
    >
      {/* tab i */}
      {icon}
      <p>{text}</p>
    </div>
  )
}

export default HomeChildren
