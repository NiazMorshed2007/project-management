import { Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const CustomTabs = (props) => {
  const { tabs, defaultActiveTabId } = props;
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const tabRef = useRef();
  const setActiveKey = (key) => {
    setActiveTab(key);
  };
  console.log(tabRef);
  // useEffect(() => {
  //   setInkWidth(tabRef.current.offsetWidth);
  // }, [activeTab]);
  useEffect(() => {
    setActiveTab(defaultActiveTabId);
  }, [defaultActiveTabId]);
  return (
    <>
      <div className="tabs-wrapper relative flex items-center gap-4">
        {tabs.map((tab) => (
          <div
            ref={tabRef}
            onClick={() => {
              setActiveKey(tab.id);
              navigate(tab.link);
            }}
            style={{ ...tab.style }}
            className={`tab ${tab.id} ${
              activeTab === tab.id && "active-tab font-semibold"
            } cursor-pointer`}
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
