import React, {useState, useEffect, useRef} from 'react'
import {Outlet, useParams} from 'react-router-dom'

//Thư mục
import styles from './HomePage.module.scss'
import SideBar from '../../components/Home/SideBar/SideBar'
import HeaderNavBar from 'app/views/components/Home/MainContent/Header/HeaderNavBar'
import {keysLocal} from 'app/localStorage/keys'
import {getItem} from 'app/localStorage/localStorage'

const icon = {
  arrowLeft: <i className='fas fa-arrow-left'></i>,
}

function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  const param = useParams() // param of url

  const fullName = JSON.parse(getItem(keysLocal.userInfo))

  return (
    <div className={styles.container}>
      <SideBar fullName={fullName.fullName} />
      <div className={styles.wrapper_mainContent}>
        <HeaderNavBar
          fullName={fullName.fullName}
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
