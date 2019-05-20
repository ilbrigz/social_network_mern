import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import utilsReducer from "./utilsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  utils: utilsReducer,
  user: userReducer
});
