import axios from "axios";
import { CREATE_POST, GET_ALL_POSTS, GET_POST_BY_ID } from "./types";
import { getErrors, clearErrors } from "./errorActions";
import { setLoading, clearLoading } from "./utilsActions";
import { batchActions } from "redux-batched-actions";
import { createAction } from "redux-actions";
const setPosts = createAction(GET_ALL_POSTS);

export const createPost = (userId, postData) => dispatch => {
  axios
    .post(`/post/new/${userId}`, postData)
    .then(response => dispatch({ type: CREATE_POST, payload: response }))
    .catch(err => dispatch(getErrors(err.response.data)));
};

export const getAllPosts = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/posts`)
    .then(res => {
      dispatch(
        batchActions([
          { type: GET_ALL_POSTS, payload: res.data },
          clearLoading()
        ])
      );
    })
    .catch(err => dispatch(getErrors(err.response.data.error)));
};

export const getPostById = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/post/${id}`)
    .then(res => {
      dispatch(
        batchActions([
          { type: GET_POST_BY_ID, payload: res.data },
          clearLoading()
        ])
      );
    })
    .catch(err => dispatch(getErrors(err.response.data.error)));
};
