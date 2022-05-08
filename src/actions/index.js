import { SET_G_LOADING, SET_LOGGED } from "./actionTypes";

export const setLogged = (bool) => {
  return {
    type: SET_LOGGED,
    payload: {
      val: bool,
    },
  };
};

export const SetGlobalLoading = (bool) => {
  return {
    type: SET_G_LOADING,
    payload: {
      val: bool,
    },
  };
};
