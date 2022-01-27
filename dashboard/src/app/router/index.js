import {lazy} from 'react'
import {Routes, Route, Router} from 'react-router-dom'
import MainContenTable from '../views/components/Home/MainContent/MainContenTable.js'
import MainContentHome from '../views/components/Home/MainContent/MainContentHome.js'
import HomeChildren from '../views/components/Home/SideBar/MenuSection/HomeChildren.js'

// path of folder
import ProtectedRouter from './ProtectedRouter'
const LoginPage = lazy(() => import('../views/pages/LoginPage'))
const HomePage = lazy(() => import('../views/pages/HomePage'))
const NewCreatePage = lazy(() =>
  import('../views/pages/ActionFormPage/NewCreate/NewCreatePage')
)
const SeeDetailPage = lazy(() =>
  import('../views/pages/ActionFormPage/SeeDetail/SeeDetailPage')
)
const EditPage = lazy(() =>
  import('../views/pages/ActionFormPage/Edit/EditPage')
)
const HomeContent = lazy(() => import('../views/pages/HomePage/HomePage'))
const Home = lazy(() => import('../views/pages/HomePage'))

function Routers() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route element={<ProtectedRouter />}>
        <Route path='home' element={<Home />}>
          <Route index element={<MainContentHome />} />
          <Route path=':name' element={<HomeContent />}>
            <Route index element={<MainContenTable />} />
            <Route path='new_create' element={<NewCreatePage />} />
            <Route path='see_detail'>
              <Route path=':id' element={<SeeDetailPage />} />
            </Route>
            <Route path='edit'>
              <Route path=':id' element={<EditPage />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<h2>Trang không tồn tại</h2>} />
      </Route>
    </Routes>
  )
}

export default Routers
