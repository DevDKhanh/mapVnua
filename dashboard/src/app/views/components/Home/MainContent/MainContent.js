import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {useOutletContext} from 'react-router-dom'
import {useDispatch} from 'react-redux'

//Thư mục
import styles from './MainContent.module.scss'
import PanelMainContent from 'app/views/components/Panel/PanelMainContent'
import {reqDisplay} from 'app/redux/action/action.componentDisplay'

//styled
const H2Element = styled.h2`
  color: #89aadd;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

function MainContent() {
  const dataDisplayComponent = useSelector((state) => state.displayMainContent) //value return redux to display component
  const setIsVisible = useOutletContext() //get props from parents
  return (
    <div
      className={styles.wrapper_mainContent}
      onClick={() => setIsVisible(false)}
    >
      {dataDisplayComponent['textComponentDisplay'] === 'home' ? (
        <H2Element>Chào mừng bạn đến với trang quản trị bản đồ !</H2Element>
      ) : (
        <React.Fragment>
          <PanelMainContent
            nameHead={dataDisplayComponent.theadTable}
            dataTable={dataDisplayComponent.data}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default MainContent
