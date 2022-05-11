import React from "react";
import { useSelector } from "react-redux";
import BaseInfo from "../../components/BaseInfo";
import { MdOutlineEmail } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

const HomeOverview = () => {
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  return (
    <>
      <BaseInfo
        rounded={true}
        avatar={
          <>
            {userProfile.avatar !== null ? (
              <img src={userProfile.avatar} alt="avatar" />
            ) : (
              <h1 className=" text-white text-7xl m-0">
                {userProfile.logoText}
              </h1>
            )}
          </>
        }
        info={
          <>
            <p className="text-lg text-secondary/50 m-0">USER</p>
            <h1 className="text-4xl mb-1">{userProfile.name}</h1>
            <p className="text-base text-secondary mb-2">
              Joined At {userProfile.joinedAt}
            </p>
            <p className="flex items-center text-sm gap-2">
              <i className="text-lg text-secondary/70">
                <MdOutlineEmail />
              </i>
              <span>{userProfile.email}</span>
            </p>
          </>
        }
        actions={
          <>
            <i className="cursor-pointer">
              <FiEdit2 />
            </i>
          </>
        }
      />
    </>
  );
};

export default HomeOverview;
