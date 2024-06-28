import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import demo from "./demo";
import bookmark from "./bookmark";
const rootReducer = combineReducers({
  alert,
  auth,
  demo,
  bookmark,
});

export default rootReducer;
