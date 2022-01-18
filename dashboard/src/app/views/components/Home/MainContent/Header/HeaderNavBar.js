import React, {useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// Thư viện
import styles from './HeaderNavBar.module.scss'

// Components
import Avatar from '../../../Avatar/Avatar'
import Logout from '../Logout/Logout'
import getTableList from 'app/common/covertData'

function HeaderNavBar({icon, text, isVisible, setIsVisible}) {
  //navigate
  const navigate = useNavigate()
  const {name} = useParams()
  const dispatch = useDispatch()

  const handleClickBack = () => {
    getTableList(name, null, dispatch)
    navigate(-1)
  }

  return (
    <div className={styles.wrapper_header_navBar}>
      <div
        className={styles.wrapper_header_navBarLeft}
        onClick={() => setIsVisible(false)}
      >
        {icon && <div onClick={handleClickBack}>{icon.arrowLeft}</div>}
        {text && <h2>{text}</h2>}
      </div>
      <div
        onClick={() => setIsVisible(!isVisible)}
        className={styles.wrapper_header_navBarRight}
      >
        <Avatar size={40} />
        <p>Thanh</p>
        <i className='fas fa-caret-down'></i>
      </div>
      {/* logout */}
      {isVisible && (
        <div className={styles.wrapper_logout}>
          <Logout />
        </div>
      )}
    </div>
  )
}

export default HeaderNavBar
