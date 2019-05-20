import {
  IS_LOADING,
  CLEAR_LOADING,
  IS_FETCHING,
  CLEAR_FETCHING
} from "../actions/types";

export default function(state = { loading: false, fetching: false }, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false
      };
    case IS_FETCHING:
      return {
        ...state,
        fetching: true
      };
    case CLEAR_FETCHING:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
}
