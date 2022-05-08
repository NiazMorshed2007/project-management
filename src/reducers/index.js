import { combineReducers } from "redux";
import GlobalLoadingReducer from "./isGlobalLoading";
import LoggedReducer from "./isLogged";
import UserProfileReducer from "./userProfile";

const rootReducer = combineReducers({
  isLogged: LoggedReducer,
  isGlobalLoading: GlobalLoadingReducer,
  userProfile: UserProfileReducer,
});

export default rootReducer;
