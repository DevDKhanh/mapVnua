import { combineReducers } from "redux";

//reducer
import classListReducer from "./classListReducer";

const rootReducer = combineReducers({
  classList: classListReducer,
});

export default rootReducer;
