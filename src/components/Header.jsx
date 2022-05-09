import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

const Header = () => {
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  function callback(key) {
    console.log(key);
  }
  return (
    <>
      <header className="main-header p-5 pb-0 w-full sticky top-0 border-b">
        <div className="upper flex items-center justify-between">
          <div className="right flex items-center gap-4">
            <div className="burger cursor-pointer">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <p className="text-lg ">{userProfile.displayName}</p>
          </div>
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
        {/* <div className="down mt-5 flex items-center gap-5"> */}

        {/* </div> */}
      </header>
    </>
  );
};

export default Header;
