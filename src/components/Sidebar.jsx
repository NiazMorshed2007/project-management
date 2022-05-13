import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedSidebar } from "../actions";
import Logo from "./Logo";
import { AiOutlinePushpin, AiOutlineSearch } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Dropdown, Menu } from "antd";

const Sidebar = () => {
  const navigate = useNavigate();
  const isOpenedSidebar = useSelector((state) => {
    return state.isOpenedSidebar;
  });
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const sideBarRef = useRef();
  const dispatch = useDispatch();
  const hideSidebar = (e) => {
    if (!sideBarRef.current.contains(e.target)) {
      dispatch(setOpenedSidebar(false));
    }
  };
  return (
    <div
      onClick={hideSidebar}
      className={`fixed w-screen h-screen ${
        isOpenedSidebar ? "pointer-events-auto" : "pointer-events-none"
      } z-20`}
    >
      <aside
        ref={sideBarRef}
        className={`sidebar ${
          isOpenedSidebar ? "translate-x-0" : "-translate-x-full"
        } p-2 fixed h-full bg-white shadow-lg border border-gray-200`}
      >
        <header className="flex p-2 pl-0 items-center justify-between">
          <div>
            <Logo w={70} h={40} />
          </div>
          <div className="flex items-center gap-4">
            <i>
              <AiOutlineSearch />
            </i>
            <i>
              <AiOutlinePushpin />
            </i>
          </div>
        </header>
        <main className="py-2 pr-2">
          <div
            onClick={() => {
              navigate("/u/my_tasks");
            }}
            className="sec"
          >
            <div className="avatar p-1 w-6 h-6 text-xs flex items-center justify-center bg-brand rounded-full text-white">
              {userProfile.logoText}
            </div>
            <p className="m-0">My Tasks</p>
          </div>
          <div
            // onClick={() => {
            //   navigate("/u/my_tasks");
            // }}
            className="sec justify-between"
          >
            <p className="m-0">WORKSPACE</p>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu
                  items={[
                    {
                      label: "Add Project",
                      key: "add_project",
                      onClick: () => {
                        navigate(
                          `/c/project/${userProfile.organizations[0].org_id}`
                        );
                      },
                    },
                    {
                      label: "Add Organization",
                      key: "add_org",
                      onClick: () => {
                        navigate("/c/organization");
                      },
                    },
                  ]}
                />
              }
            >
              <i>
                <AiOutlinePlus />
              </i>
            </Dropdown>
          </div>
          <div className="flex-col items-start">
            Organizations
            <div>
              {userProfile.organizations &&
                userProfile.organizations.map((org) => (
                  <div
                    key={org.org_id}
                    onClick={() => {
                      navigate(`/w/o/overview?orgId=${org.org_id}`);
                    }}
                    className=" hover:text-brand cursor-pointer"
                  >
                    {org.org_name}
                  </div>
                ))}
            </div>
          </div>
        </main>
      </aside>
    </div>
  );
};

export default Sidebar;
