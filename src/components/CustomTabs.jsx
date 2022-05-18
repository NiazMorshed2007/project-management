import { Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const CustomTabs = (props) => {
  const { tabs, defaultActiveTabId } = props;
  const [activeTab, setActiveTab] = useState(defaultActiveTabId);
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
              navigate(tab.link);
            }}
            style={{ ...tab.style }}
            className={`tab ${tab.id} ${
              activeTab === tab.id && "active-tab border-b-brand font-semibold"
            } cursor-pointer border-transparent border-b-2`}
            key={tab.id}
          >
            <p className=" capitalize">{tab.name}</p>
          </div>
        ))}
        <div
          style={{
            // width: currnetTab ? tabRef.current.offsetWidth : "20px",
            height: "1px",
          }}
          className="ink-bar absolute bg-brand left-0 bottom-0"
        ></div>
      </div>
    </>
  );
};

export default CustomTabs;
