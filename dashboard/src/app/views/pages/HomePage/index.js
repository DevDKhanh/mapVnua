import React, {useState, useEffect} from 'react'
import {Outlet, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

//Thư mục
import styles from './HomePage.module.scss'
import SideBar from '../../components/Home/SideBar/SideBar'
import HeaderNavBar from 'app/views/components/Home/MainContent/Header/HeaderNavBar'
import tableDataAPI from 'app/api/tableData'

//Component
// import HeaderNavBar from "../../components/Home/MainContent/Header/HeaderNavBar";

const icon = {
  arrowLeft: <i className='fas fa-arrow-left'></i>,
}
function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  // useEffect(async () => {
  // const listArea = await tableDataAPI.getList("area", 1, 3);
  //   console.log(listArea[0]["records"]);
  // }, []);

  // get user info to redux
  const userInfo = useSelector((state) => state['userInfo']['userInfo'])
  // console.log(userInfo);
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
