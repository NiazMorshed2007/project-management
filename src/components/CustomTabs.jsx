import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomTabs = (props) => {
  const { tabs, defaultActiveTabId } = props;
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const setActiveKey = (key) => {
    setActiveTab(key);
    navigate(`/u/${key}`);
  };
  // useEffect(() => {
  //   setInkWidth(tabRef.current.offsetWidth);
  // }, [activeTab]);
  useEffect(() => {
    setActiveTab(defaultActiveTabId);
  }, [defaultActiveTabId]);
  console.log("custom tabs");
  return (
    <div className="tabs-wrapper relative flex items-center gap-4">
      {tabs.map((tab) => (
        <div
          // ref={tab === activeTab && tabRef}
          onClick={() => {
            setActiveKey(tab.id);
          }}
          style={{ ...tab.style }}
          className={`tab ${
            activeTab === tab.id && "font-semibold border-brand border-b"
          } transition-all cursor-pointer`}
          key={tab.id}
        >
          <p className=" capitalize">{tab.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomTabs;
