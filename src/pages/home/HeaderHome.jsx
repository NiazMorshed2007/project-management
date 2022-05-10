import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomTabs from "../../components/CustomTabs";
import Header from "../../layout/Header";

const HeaderHome = (props) => {
  const { id } = props;
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const [tabs, setTabs] = useState([]);
  console.log("header home changes");
  useEffect(() => {
    setTabs([
      {
        name: "My Tasks",
        id: "my_tasks",
      },
      {
        name: "Overview",
        id: "overview",
      },
    ]);
  }, []);
  return (
    <>
      <Header head={userProfile.name}>
        <CustomTabs defaultActiveTabId={id} tabs={tabs} />
      </Header>
    </>
  );
};

export default HeaderHome;
