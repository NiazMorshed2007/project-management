import { combineReducers } from "redux";
import GlobalLoadingReducer from "./isGlobalLoading";
import LoggedReducer from "./isLogged";
import SidebarReducer from "./isOpenedSidebar";
import UserProfileReducer from "./userProfile";

const rootReducer = combineReducers({
  isLogged: LoggedReducer,
  isGlobalLoading: GlobalLoadingReducer,
  userProfile: UserProfileReducer,
  isOpenedSidebar: SidebarReducer,
});

export default rootReducer;
