import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedSidebar } from "../actions";
import Logo from "./Logo";

const Sidebar = () => {
  const isOpenedSidebar = useSelector((state) => {
    return state.isOpenedSidebar;
  });
  const sideBarRef = useRef();
  const dispatch = useDispatch();
  const hideSidebar = (e) => {
    if (!sideBarRef.current.contains(e.target)) {
      dispatch(setOpenedSidebar(false));
    }
  };
  return (
    <div
      onClick={hideSidebar}
      className={`fixed w-screen h-screen ${
        isOpenedSidebar ? "pointer-events-auto" : "pointer-events-none"
      } z-10`}
    >
      <aside
        ref={sideBarRef}
        className={`sidebar ${
          isOpenedSidebar ? "translate-x-0" : "-translate-x-full"
        } p-2 fixed h-full bg-white shadow-lg border border-gray-200`}
      >
        <Logo w={80} h={60} />
      </aside>
    </div>
  );
};

export default Sidebar;
