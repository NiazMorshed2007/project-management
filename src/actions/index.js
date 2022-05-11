import {
  SET_G_LOADING,
  SET_LOGGED,
  SET_OPEN_SIDEBAR,
  SET_USER_PROFILE,
} from "./actionTypes";

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

export const setOpenedSidebar = (bool) => {
  return {
    type: SET_OPEN_SIDEBAR,
    payload: {
      val: bool,
    },
  };
};

export const setUserProfile = (obj) => {
  return {
    type: SET_USER_PROFILE,
    ...obj,
  };
};
