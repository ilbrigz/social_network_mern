import { CREATE_POST, GET_ALL_POSTS, GET_POST_BY_ID } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return { createPost: action.payload };
    case GET_ALL_POSTS:
      return { ...state, posts: action.payload };
    case GET_POST_BY_ID:
      return { ...state, postById: action.payload };
    default:
      return state;
  }
}
