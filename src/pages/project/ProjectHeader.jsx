import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomTabs from "../../components/CustomTabs";
import Header from "../../layout/Header";

const ProjectHeader = (props) => {
  const { project, tabId } = props;
  const location = useLocation();
  const location_params = location.search;
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    setTabs([
      {
        name: "Lists",
        id: "lists",
        link: `/w/p/lists${location_params}`,
      },
      {
        name: "Overview",
        id: "overview",
        link: `/w/p/overview${location_params}`,
      },
    ]);
  }, []);
  return (
    <Header head={project && project.project_name}>
      <CustomTabs defaultActiveTabId={tabId} tabs={tabs} />
    </Header>
  );
};

export default ProjectHeader;
