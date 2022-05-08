import { combineReducers } from "redux";
import GlobalLoadingReducer from "./isGlobalLoading";
import LoggedReducer from "./isLogged";

const rootReducer = combineReducers({
  isLogged: LoggedReducer,
  isGlobalLoading: GlobalLoadingReducer,
});

export default rootReducer;
