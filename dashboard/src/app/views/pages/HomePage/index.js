import React, {useState, useEffect} from 'react'
import {Outlet, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'

//Thư mục
import styles from './HomePage.module.scss'
import SideBar from '../../components/Home/SideBar/SideBar'
import HeaderNavBar from 'app/views/components/Home/MainContent/Header/HeaderNavBar'
import dataFormTable from 'app/config/dataForm'
import getTableList from 'app/common/covertData'
import {reqDisplay} from 'app/redux/action/action.componentDisplay'
import MainContent from '../../components/Home/MainContent/MainContent.js'

const icon = {
  arrowLeft: <i className='fas fa-arrow-left'></i>,
}

function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  //dispatch
  const dispatch = useDispatch()

  useEffect(() => {
    ;(() => {
      Object.keys(dataFormTable).map((keys) =>
        getTableList(keys, 'home', dispatch)
      )
    })()
  }, [])

  const param = useParams() // param of url

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.wrapper_mainContent}>
        <HeaderNavBar
          icon={Object.keys(param)[0] && icon}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        <Outlet context={setIsVisible} />
      </div>
    </div>
  )
}

export default HomePage
