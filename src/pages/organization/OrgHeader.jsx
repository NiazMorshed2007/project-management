import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsFullscreen, BsPencil, BsTrash } from "react-icons/bs";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import CustomTabs from "../../components/CustomTabs";
import Header from "../../layout/Header";

const OrgHeader = (props) => {
  const { id, org } = props;
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
    <Header
      head={
        <>
          <div className="flex items-center gap-2">
            <p className="m-0">{org && org.org_name}</p>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu
                  items={[
                    {
                      label: "Edit name and description",
                      icon: <BsPencil />,
                      key: "edit name_&_es",
                    },
                    {
                      label: "Edit members",
                      icon: <BiUser />,
                      key: "edit_members",
                    },
                    {
                      type: "divider",
                    },
                    {
                      label: (
                        <div className="flex items-center justify-between">
                          <p className="m-0">Enter full screen</p>
                          <div className="ml-4">
                            <kbd>Ctrl</kbd>+<kbd>.</kbd>
                          </div>
                        </div>
                      ),
                      icon: <BsFullscreen />,
                      key: "full_screen",
                    },
                    {
                      type: "divider",
                    },
                    {
                      label: "Add Project",
                      icon: <GrAdd />,
                      key: "add_project",
                    },
                    {
                      type: "divider",
                    },
                    {
                      label: "Delete",
                      key: "delete",
                      icon: <BsTrash />,
                    },
                    {
                      label: "Options",
                      key: "options",
                      icon: <FiSettings />,
                    },
                  ]}
                />
              }
            >
              <i>
                <FiChevronDown />
              </i>
            </Dropdown>
          </div>
        </>
      }
    >
      <CustomTabs defaultActiveTabId={id} tabs={tabs} />
    </Header>
  );
};

export default OrgHeader;
