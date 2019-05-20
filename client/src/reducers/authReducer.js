import { SET_USER, CLEAR_USER, GET_USER_BY_ID } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
        userName: action.payload.name || action.payload.userName
      };
    case CLEAR_USER:
      return { ...state, userId: null, userName: null };
    case GET_USER_BY_ID:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}
