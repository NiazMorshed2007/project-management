import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  return (
    <header className="main-header p-5 pb-0 w-full sticky top-0 border-b">
      <div className="upper flex items-center justify-between">
        <div className="right flex items-center gap-4">
          <div className="burger cursor-pointer">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <p className="text-lg ">{userProfile.displayName}</p>
        </div>
      </div>
      <div className="down mt-5 flex items-center gap-5">
        <p>Overview</p>
        <p>My Tasks</p>
      </div>
    </header>
  );
};

export default Header;
