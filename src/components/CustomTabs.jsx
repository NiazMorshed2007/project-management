import React, { useEffect, useRef, useState } from "react";

const CustomTabs = (props) => {
  const { tabs } = props;
  const tabRef = useRef();
  const [inkWidth, setInkWidth] = useState();
  const [activeTab, setActiveTab] = useState(1);
  const setActiveKey = (key) => {
    setActiveTab(key);
  };
  useEffect(() => {
    setInkWidth(tabRef.current.offsetWidth);
  }, [activeTab]);
  return (
    <div className="tabs-wrapper relative flex items-center gap-4">
      {tabs.map((tab, i) => (
        <div
          ref={tabRef}
          onClick={() => {
            setActiveKey(i);
          }}
          style={{ ...tab.style }}
          className={`tab ${
            activeTab === i && "font-semibold border-brand border-b"
          } transition-all cursor-pointer`}
          key={i}
        >
          <p>{tab}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomTabs;
