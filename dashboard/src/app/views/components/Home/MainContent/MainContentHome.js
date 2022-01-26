import React from 'react'
import styled from 'styled-components'
import styles from './MainContent.module.scss'
import {useOutletContext} from 'react-router-dom'

//styled
const H2Element = styled.h2`
  color: #89aadd;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
`

const MainContentHome = () => {
  const toggleLogout = useOutletContext() //get props from parents

  return (
    <div
      className={styles.wrapper_mainContent}
      onClick={() => toggleLogout(false)}
    >
      <H2Element>Chào mừng bạn đến với trang quản trị bản đồ !</H2Element>
    </div>
  )
}

export default MainContentHome
