import React from "react";
import { useSelector } from "react-redux";
import Logo from "./Logo";

const Sidebar = () => {
  const isOpenedSidebar = useSelector((state) => {
    return state.isOpenedSidebar;
  });
  return (
    <div
      className={`fixed w-screen h-screen ${
        isOpenedSidebar ? "z-10" : "-z-10"
      }`}
    >
      <aside className="sidebar -translate-x-full transition-all p-2 fixed h-full bg-white shadow-lg border border-gray-200">
        <Logo w={80} h={60} />
      </aside>
    </div>
  );
};

export default Sidebar;
