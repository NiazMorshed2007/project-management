import React from "react";
import { useSelector } from "react-redux";
import CustomTabs from "../../components/CustomTabs";
import Header from "../../layout/Header";

const HeaderHome = () => {
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const tabs = ["My Tasks", "Overview"];
  return (
    <>
      <Header head={userProfile.displayName}>
        <CustomTabs tabs={tabs} />
      </Header>
    </>
  );
};

export default HeaderHome;
