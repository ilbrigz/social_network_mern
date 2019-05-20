import axios from "axios";
import { SET_USER, CLEAR_USER } from "./types";
import { setLoading, clearLoading } from "./utilsActions";
import { clearErrors, getErrors } from "./errorActions";
import setDefaultHeader from "../utils/setDefaultHeader";

const clearUser = () => {
  return { type: CLEAR_USER };
};

export const signUpUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(setLoading());
  axios
    .post("/signup", userData)
    .then(res => {
      dispatch(clearLoading());
      history.push("/signin");
    })
    .catch(err => {
      dispatch(getErrors(err.response.data));
    });
};

export const signInUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(setLoading());
  if (typeof window === "undefined") {
    dispatch(clearLoading());
    return;
  }
  axios
    .post("/signin", userData)
    .then(res => {
      const { verificationId, userId, name } = res.data;
      localStorage.setItem("verificationId", verificationId);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", name);
      setDefaultHeader(verificationId);
      // TODO: decode user using jwt_decode => setUser in redux
      dispatch({ type: SET_USER, payload: { userId: userId, userName: name } });
      dispatch(clearLoading());
    })
    .then(res => history.push("/"))
    .catch(err => {
      dispatch(getErrors(err.response.data));
    });
};

export const signOutUser = (userData, history) => dispatch => {
  if (typeof window === "undefined") {
    return;
  }
  // Remove token from localStorage
  localStorage.removeItem("verificationId");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  dispatch(clearUser());
  axios.get("/signout");
  // TODO: implement bellow
  // Remove auth header for future requests
  // setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  // dispatch(setCurrentUser({}));
};
