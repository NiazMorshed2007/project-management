import React, { useEffect, useState } from "react";
import CustomTabs from "../../components/CustomTabs";
import Header from "../../layout/Header";

const OrgHeader = (props) => {
  const { id } = props;
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    setTabs([
      {
        name: "Overview",
        id: "overview",
        link: "/w/o/overview",
      },
    ]);
  }, []);
  return (
    <Header head={"Organization title here"}>
      <CustomTabs defaultActiveTabId={id} tabs={tabs} />
    </Header>
  );
};

export default OrgHeader;
