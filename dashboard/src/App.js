import React, {Suspense} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Routers from 'app/router'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={null}>
          <Routers />
        </Suspense>
      </Router>
    </React.Fragment>
  )
}

export default App
