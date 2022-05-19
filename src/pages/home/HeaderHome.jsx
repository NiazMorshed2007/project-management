import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomTabs from "../../components/CustomTabs";
import Header from "../../layout/Header";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import { BsFullscreen, BsPencil } from "react-icons/bs";

const HeaderHome = (props) => {
  const { id } = props;
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    setTabs([
      {
        name: "My Tasks",
        id: "my_tasks",
        link: "/u/my_tasks",
      },
      {
        name: "Overview",
        id: "overview",
        link: "/u/overview",
      },
    ]);
  }, []);
  return (
    <>
      <Header
        head={
          <div className="flex items-center gap-2">
            <p className="m-0">{userProfile.name}</p>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu
                  items={[
                    {
                      label: "Edit name & description",
                      key: "edit_name&des",
                      icon: <BsPencil />,
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
                      label: "Account Settings",
                      key: "account_settings",
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
        }
      >
        <CustomTabs defaultActiveTabId={id} tabs={tabs} />
      </Header>
    </>
  );
};

export default HeaderHome;
