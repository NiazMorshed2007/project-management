import { Dropdown, Menu } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { iconsArr } from "../functions/icons.arr";
import DeleteModal from "./DeleteModal";

const CustomTabs = (props) => {
  const { tabs, defaultActiveTabId, project, org, addingOption } = props;
  const [activeTab, setActiveTab] = useState(defaultActiveTabId);
  const [delModalVisib, setDelModalVisib] = useState(false);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const location = useLocation();
  const location_params = location.search;
  const navigate = useNavigate();
  const tabRef = useRef([]);
  const handleDeleteSublist = () => {
    const di = project.tabs.findIndex((tab) => {
      return tab.id === currentTabIndex;
    });
    project.tabs.splice(di, 1);
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
    navigate(`/w/p/lists/tree${location.search}`);
    setDelModalVisib(false);
  };
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
              <>
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
                            onClick: () => {
                              setDelModalVisib(true);
                              setCurrentTabIndex(i);
                            },
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
              </>
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
        <DeleteModal
          visible={delModalVisib}
          setVisible={setDelModalVisib}
          onOk={handleDeleteSublist}
          type={"Sublist"}
          name={tabs[currentTabIndex] && tabs[currentTabIndex].name}
        />
      </div>
    </>
  );
};

export default CustomTabs;
