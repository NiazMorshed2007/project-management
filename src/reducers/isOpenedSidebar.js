import { SET_OPEN_SIDEBAR } from "../actions/actionTypes";

const isOpenedSidebar = false;

const SidebarReducer = (state = isOpenedSidebar, action) => {
  switch (action.type) {
    case SET_OPEN_SIDEBAR: {
      return action.payload.val;
    }
    default:
      return state;
  }
};

export default SidebarReducer;
