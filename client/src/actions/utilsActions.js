import {
  IS_LOADING,
  CLEAR_LOADING,
  IS_FETCHING,
  CLEAR_FETCHING
} from "./types";

export const setLoading = () => {
  return {
    type: IS_LOADING
  };
};

export const clearLoading = () => {
  return {
    type: CLEAR_LOADING
  };
};
export const setFetching = () => {
  return {
    type: IS_FETCHING
  };
};

export const clearFetching = () => {
  return {
    type: CLEAR_FETCHING
  };
};
