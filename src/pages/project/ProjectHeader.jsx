import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTabs from "../../components/CustomTabs";
import Header from "../../layout/Header";
import { BsBuilding, BsPencil, BsTrash, BsCircle, BsTags, BsFullscreen } from "react-icons/bs";
import {BiUser, BiMessageRounded} from 'react-icons/bi';
import { FiChevronDown, FiBook, FiEye, FiSettings } from "react-icons/fi";

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
                        key: "edit_name&des",
                        icon: <BsPencil />,
                      },
                      {
                        label: "Edit members",
                        key: 'edit_member',
                        icon: <BiUser />
                      },
                      {
                        label: "Edit statuses",
                        key: 'edit_statuses',
                        icon: <BsCircle />
                      },
                      {
                        label: 'Edit tags',
                        key: 'edit_tags',
                        icon: <BsTags />
                      },
                      {
                        type: "divider",
                      },
                      {
                        label: <div className="flex items-center justify-between">
                          <p className="m-0">Enter full screen</p>
                          <div>
                            <kbd>Ctrl</kbd>+<kbd>.</kbd>
                          </div>
                        </div>,
                        icon: <BsFullscreen />,
                        key: 'full_screen'
                      },
                      {
                        type: "divider",
                      },
                      {
                        label: 'Follow',
                        key: 'follow',
                        icon: <FiEye />
                      },
                      {
                        label: 'Comment',
                        key: 'comment',
                        icon: <BiMessageRounded />
                      },
                      {
                        type: 'divider'
                      },
                      {
                        label: 'Delete',
                        key: 'delete',
                        icon: <BsTrash />
                      },
                      {
                        label: 'Options',
                        key: 'options',
                        icon: <FiSettings />
                      }
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
