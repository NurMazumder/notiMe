import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import demo from "./demo";
const rootReducer = combineReducers({
  alert,
  auth,
  demo,
});

export default rootReducer;
