import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import utilsReducer from "./utilsReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  utils: utilsReducer,
  user: userReducer,
  post: postReducer
});
