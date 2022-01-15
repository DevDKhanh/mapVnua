import {keysLocal} from 'app/localStorage/keys'
import {getItem} from 'app/localStorage/localStorage'
import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

// path of folder

const useAuth = () => {
  const token = getItem(keysLocal.token) // token
  const user = {loggedIn: Boolean(token)} // state of user
  return user && user['loggedIn']
}

const ProtectedRouter = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRouter
