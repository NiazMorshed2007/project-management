import { SET_LOGGED } from "./ActionTypes";

export const setLogged = (bool) => {
  return {
    type: SET_LOGGED,
    payload: {
      val: bool,
    },
  };
};
