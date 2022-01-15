import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './app/style/index.scss'

// REDUX
import {Provider} from 'react-redux'
import store from './app/redux/store/store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
