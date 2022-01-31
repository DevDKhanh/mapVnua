import React, {useState} from 'react'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// Thư viện
import styles from './HeaderNavBar.module.scss'

// Components
import Avatar from '../../../Avatar/Avatar'
import Logout from '../Logout/Logout'
import getTableList from 'app/common/covertData'

const RenderIconOrText = ({urlParam, nameURL, icon}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClickBack = () => {
    getTableList(nameURL, null, dispatch)
    navigate(nameURL)
  }

  if (
    urlParam.pathname === `/home/${nameURL}` ||
    urlParam.pathname === `/home/${nameURL}/`
  ) {
    return <h2>{nameURL}</h2>
  } else {
    return icon ? <div onClick={handleClickBack}>{icon.arrowLeft}</div> : null
  }
}

function HeaderNavBar({fullName, icon, isVisible, setIsVisible}) {
  //navigate
  const {name} = useParams()
  const urlParam = useLocation()

  return (
    <div className={styles.wrapper_header_navBar}>
      <div
        className={styles.wrapper_header_navBarLeft}
        onClick={() => setIsVisible(false)}
      >
        <RenderIconOrText urlParam={urlParam} nameURL={name} icon={icon} />
      </div>
      <div
        onClick={() => setIsVisible(!isVisible)}
        className={styles.wrapper_header_navBarRight}
      >
        <Avatar size={40} />
        <p>{fullName}</p>
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
