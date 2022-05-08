import { SET_G_LOADING } from "../actions/actionTypes";

const isGLoading = true;

const GlobalLoadingReducer = (state = isGLoading, action) => {
  switch (action.type) {
    case SET_G_LOADING: {
      return action.payload.val;
    }
    default:
      return state;
  }
};

export default GlobalLoadingReducer;
