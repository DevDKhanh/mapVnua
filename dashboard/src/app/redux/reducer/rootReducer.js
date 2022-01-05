import { combineReducers } from "redux";

//Thư mục
import reqDisplay from "./reqDisplay.reducer";

const rootReducer = combineReducers({
  displayMainContent: reqDisplay,
});

export default rootReducer;
