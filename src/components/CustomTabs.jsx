import { Dropdown, Menu } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { iconsArr } from "../functions/icons.arr";
import DeleteModal from "./DeleteModal";

const CustomTabs = (props) => {
  const { tabs, project, org, addingOption } = props;
  const [delModalVisib, setDelModalVisib] = useState(false);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const location = useLocation();
  const location_params = location.search;
  const navigate = useNavigate();
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
  return (
    <>
      <div className="tabs-wrapper relative flex items-center gap-4">
        {tabs.map((tab, i) => (
          <div
            style={{ ...tab.style }}
            className={`tab w-max cursor-pointer flex items-center`}
            key={tab.id}
          >
            {tab.iconIndex && iconsArr[tab.iconIndex]}
            <NavLink
              className={(l) =>
                l.isActive
                  ? "border-b-brand border-b-2 hover:text-black text-black"
                  : "text-black hover:text-black"
              }
              to={`${tab.link}${location_params}`}
            >
              <p className=" capitalize">{tab.name}</p>
            </NavLink>
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
