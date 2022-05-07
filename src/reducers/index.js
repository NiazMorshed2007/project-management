import { combineReducers } from "redux";
import LoggedReducer from "./isLogged";

const rootReducer = combineReducers({
  isLogged: LoggedReducer,
});

export default rootReducer;
