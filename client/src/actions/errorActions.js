import { CLEAR_ERRORS, GET_ERRORS } from "./types";
import { clearLoading, clearFetching } from "./utilsActions";

export const clearErrors = () => dispatch => {
  dispatch(clearLoading());
  dispatch(clearFetching());
  dispatch({
    type: CLEAR_ERRORS
  });
};

export const getErrors = data => dispatch => {
  dispatch(clearLoading());
  dispatch(clearFetching());
  dispatch({
    type: GET_ERRORS,
    payload: data
  });
};
