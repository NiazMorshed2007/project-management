import React from "react";
import { MdOutlineClear } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateHeader = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const goBack = () => {
    navigate(-1);
  };
  return (
    <header className="flex fixed w-full p-7 border-b border-gray-200 items-center justify-end">
      <i onClick={goBack} className="text-2xl cursor-pointer">
        <MdOutlineClear />
      </i>
    </header>
  );
};

export default CreateHeader;
