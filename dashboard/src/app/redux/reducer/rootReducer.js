import { combineReducers } from "redux";

//Thư mục
import reqDisplay from "./reducer.reqDisplay";
import user from "./reducer.user";

const rootReducer = combineReducers({
  displayMainContent: reqDisplay,
  userInfo: user,
});

export default rootReducer;
