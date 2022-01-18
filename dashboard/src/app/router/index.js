import {lazy} from 'react'
import {Routes, Route} from 'react-router-dom'

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

function Routers() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route element={<ProtectedRouter />}>
        <Route path='/home' element={<HomePage />}>
          <Route path='/home' element={<HomeContent />} />
          <Route path='/home/new_create/:name' element={<NewCreatePage />} />
          <Route
            path='/home/see_detail/:name/:id'
            element={<SeeDetailPage />}
          />
          <Route path='/home/edit/:name/:id' element={<EditPage />} />
        </Route>
      </Route>
      <Route path='*' element={<h2>Trang không tồn tại</h2>} />
    </Routes>
  )
}

export default Routers
