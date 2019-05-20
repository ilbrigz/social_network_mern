import axios from "axios";
import {
  FIND_PEOPLE,
  GET_USER_BY_ID,
  GET_ALL_USERS,
  DELETE_USER,
  SET_USER
} from "./types";
import { getErrors, clearErrors } from "./errorActions";
import { setLoading } from "./utilsActions";
import { signOutUser } from "./authActions";

export const getUserById = id => dispatch => {
  axios
    .get(`/user/${id}`)
    .then(res => {
      dispatch({ type: GET_USER_BY_ID, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(err => dispatch(getErrors(err.response.data.error)));
};

export const getAllUsers = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/users`)
    .then(res => {
      dispatch({ type: GET_ALL_USERS, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(err => dispatch(getErrors(err.response.data.error)));
};

export const deleteUser = (history, id) => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/user/${id}`)
    .then(res => {
      dispatch({ type: DELETE_USER });
      dispatch(signOutUser());
      dispatch(clearErrors());
    })
    .then(res => history.push("/signup"))
    .catch(err => dispatch(getErrors(err.response.data.error)));
};

export const updateUser = (data, id, history) => dispatch => {
  dispatch(setLoading());
  axios
    .put(`/user/${id}`, data)
    .then(updatedProfile => {
      dispatch({ type: SET_USER, payload: updatedProfile.data });
      dispatch(clearErrors());
      return updatedProfile;
    })
    .then(updatedProfile => {
      localStorage.setItem("userId", updatedProfile.data._id);
      localStorage.setItem("userName", updatedProfile.data.name);
      history.push(`/user/${id}`);
    })
    .catch(err => dispatch(getErrors(err.response.data)));
};
// /user/findpeople/:userid
export const findPeople = userId => dispatch => {
  axios
    .get(`user/findpeople/${userId}`)
    .then(res => {
      dispatch({ type: FIND_PEOPLE, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(err => dispatch(getErrors(err.response.data.error)));
};
