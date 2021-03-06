import { Dropdown, Menu } from "antd";
import React, { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlinePushpin,
  AiOutlineSearch,
} from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOpenedSidebar } from "../actions";
import useClickOutside from "../hooks/useClickOutside";
import Logo from "./Logo";

const Sidebar = () => {
  const navigate = useNavigate();
  const [org, setorg] = useState({});
  const isOpenedSidebar = useSelector((state) => {
    return state.isOpenedSidebar;
  });
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const organizations = () => {
    const orgs = [];
    userProfile.organizations &&
      userProfile.organizations.forEach((org) => {
        orgs.push({
          label: org.org_name,
          key: org.org_id,
          className: "w-c-m-p",
          onClick: () => {
            navigate(`/w/o/overview?orgId=${org.org_id}`);
          },
        });
      });
    return orgs;
  };
  let sideBarRef = useClickOutside(() => {
    dispatch(setOpenedSidebar(false));
  });
  const dispatch = useDispatch();
  return (
    <div
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
          <Menu
            mode="inline"
            items={[
              {
                label: (
                  <div className="flex items-center justify-between">
                    <p className="m-0">WORKSPACE</p>
                    <div className="ml-3 flex items-center gap-3">
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
                      <IoMdArrowDropdown />
                    </div>
                  </div>
                ),
                className: "w-m-p",
                type: "sub-menu",
                children: [...organizations()],
              },
            ]}
          />
          <div
            onClick={() => {
              navigate("/u/my_tasks");
            }}
            className="border-t pt-2 border-b-none"
          >
            <p className="m-0">My Tasks</p>
          </div>
          {/* <div className="flex-col items-start">
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
          </div> */}
        </main>
      </aside>
    </div>
  );
};

export default Sidebar;
