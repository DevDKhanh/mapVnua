import {combineReducers} from 'redux'

//Thư mục
import reqDisplay from './reducer.reqDisplay'
import userInfo from './reducer.user'

const rootReducer = combineReducers({
  displayMainContent: reqDisplay,
  userInfo,
})

export default rootReducer
