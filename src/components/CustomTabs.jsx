import { Dropdown, Menu } from "antd";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { iconsArr } from "../functions/icons.arr";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsPencil, BsTrash } from "react-icons/bs";

const CustomTabs = (props) => {
  const { tabs, defaultActiveTabId, addingOption } = props;
  const [activeTab, setActiveTab] = useState(defaultActiveTabId);
  const location = useLocation();
  const location_params = location.search;
  const navigate = useNavigate();
  const tabRef = useRef([]);
  const setActiveKey = (key) => {
    setActiveTab(key);
  };
  return (
    <>
      <div className="tabs-wrapper relative flex items-center gap-4">
        {tabs.map((tab, i) => (
          <div
            ref={(el) => (tabRef.current[i] = el)}
            onClick={() => {
              setActiveKey(tab.id);
              navigate(`${tab.link}${location_params}`);
            }}
            style={{ ...tab.style }}
            className={`tab ${tab.id} ${
              activeTab === tab.id
                ? "active-tab border-b-brand font-semibold"
                : "hover:border-b-brand/40 w-max "
            } cursor-pointer  flex items-center border-transparent border-b-2`}
            key={tab.id}
          >
            {tab.iconIndex && iconsArr[tab.iconIndex]}
            <p className=" capitalize">{tab.name}</p>
            {tab.type && tab.type === "sublist" && (
              <div className="opt">
                <Dropdown
                  overlay={
                    <Menu
                      items={[
                        {
                          label: "Edit this sublist",
                          key: "edit",
                          icon: <BsPencil />,
                        },
                        {
                          type: "divider",
                        },
                        {
                          label: "Delete",
                          key: "delete",
                          icon: <BsTrash />,
                        },
                      ]}
                    />
                  }
                  trigger={["click"]}
                >
                  <IoMdArrowDropdown />
                </Dropdown>
              </div>
            )}
          </div>
        ))}
        {addingOption}
        <div
          style={{
            height: "1px",
          }}
          className="ink-bar absolute bg-brand left-0 bottom-0"
        ></div>
      </div>
    </>
  );
};

export default CustomTabs;
