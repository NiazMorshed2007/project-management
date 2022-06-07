import { Dropdown, Menu, Tooltip } from "antd";
import React from "react";
import { AiOutlinePlus, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { BsCreditCard2Front } from "react-icons/bs";
import { RiApps2Line } from "react-icons/ri";
import { IoColorPaletteOutline } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { setOpenedSidebar } from "../actions";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { head, children } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const showSidebar = () => {
    dispatch(setOpenedSidebar(true));
  };
  return (
    <header className="main-header bg-white/90 backdrop-blur-xl z-10 p-5 pr-3 pl-7 pb-0 w-full sticky top-0 border-b">
      <div className="upper flex items-center justify-between">
        <div className="left flex items-center gap-4">
          <div onClick={showSidebar} className="burger cursor-pointer">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <p className="text-lg ">{head}</p>
        </div>
        <div className="right mr-4 border-l border-secondary/30 pl-4 flex items-center gap-4">
          <Dropdown
            placement="bottom"
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
          <AiOutlineSearch />
          <Tooltip title={"Notification"}>
            <IoMdNotificationsOutline />
          </Tooltip>
          <div className="avatar-wrapper cursor-pointer">
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu
                  items={[
                    {
                      style: {
                        background: "none",
                        padding: "0 12px",
                      },
                      label: (
                        <span className="text-xs text-secondary">
                          {userProfile.name}
                        </span>
                      ),
                    },
                    { type: "divider" },
                    {
                      label: "My Profile",
                      icon: <AiOutlineUser />,
                      key: "profile",
                    },
                    {
                      label: "My Subscriptions",
                      icon: <BsCreditCard2Front />,
                      key: "subscription",
                    },
                    {
                      label: "My Apps",
                      icon: <RiApps2Line />,
                      key: "apps",
                    },
                    { type: "divider" },
                    {
                      key: "apperance",
                      type: "sub-menu",
                      label: (
                        <div className="flex items-center justify-between">
                          <p className="m-0">Appearance</p>
                          <div className="ml-3">
                            <IoMdArrowDropright />
                          </div>
                        </div>
                      ),
                      icon: <IoColorPaletteOutline />,
                      children: [
                        {
                          key: "3",
                          label: "3rd menu item",
                        },
                        {
                          key: "4",
                          label: "4th menu item",
                        },
                      ],
                    },
                  ]}
                  style={{ marginRight: 10 + "px" }}
                />
              }
            >
              <Tooltip title={userProfile.displayName}>
                <div className="avatar p-1 w-7 h-7 flex items-center justify-center bg-brand rounded-full text-white">
                  {userProfile.logoText}
                </div>
              </Tooltip>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="down mt-5 flex items-center gap-5">{children}</div>
    </header>
  );
};

export default Header;
