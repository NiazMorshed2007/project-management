import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTabs from "../../components/CustomTabs";
import Header from "../../layout/Header";
import { BsBuilding, BsPencil } from "react-icons/bs";
import { FiChevronDown, FiBook } from "react-icons/fi";

const ProjectHeader = (props) => {
  const { project, org, tabId } = props;
  const location = useLocation();
  const navigate = useNavigate();
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
    <Header
      head={
        project && (
          <>
            <div className="flex items-center gap-1">
              <p className="m-0">{project.project_name}</p>
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu
                    items={[
                      {
                        label: `Go to ${org.org_name}`,
                        key: "org_name",
                        icon: <BsBuilding />,
                        onClick: () => {
                          navigate(`/w/o/overview?orgId=${org.org_id}`);
                        },
                      },
                      {
                        label: (
                          <>
                            <p className="m-0">
                              Go to other projects... <kbd>Ctrl</kbd>+
                              <kbd>B</kbd>
                            </p>
                          </>
                        ),
                        key: "navig_other",
                        icon: <FiBook />,
                      },
                      {
                        type: "divider",
                      },
                      {
                        label: "Edit Name and Description",
                        key: "edit",
                        icon: <BsPencil />,
                      },
                    ]}
                  />
                }
              >
                <i className=" cursor-pointer">
                  <FiChevronDown />
                </i>
              </Dropdown>
            </div>
          </>
        )
      }
    >
      <CustomTabs defaultActiveTabId={tabId} tabs={tabs} />
    </Header>
  );
};

export default ProjectHeader;
