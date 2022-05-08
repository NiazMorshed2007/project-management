import { SET_USER_PROFILE } from "../actions/actionTypes";

const userProfile = {};

const UserProfileReducer = (state = userProfile, action) => {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return action;
    }
    default:
      return state;
  }
};

export default UserProfileReducer;
