import React, {Suspense} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Routers from 'app/router'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={null}>
          <Routers />
        </Suspense>
      </Router>
      <ToastContainer />
    </React.Fragment>
  )
}

export default App
