import React from 'react'
import {Outlet, useOutletContext} from 'react-router-dom'

//Thư mục
import styles from './MainContent.module.scss'

function MainContent() {
  const toggleLogout = useOutletContext() //get props from parents

  return (
    <div
      className={styles.wrapper_mainContent}
      onClick={() => toggleLogout(false)}
    >
      <Outlet />
    </div>
  )
}

export default MainContent
