import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TreeView from "../../views/TreeView";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { BsListNested, BsListStars } from "react-icons/bs";
import { FiFilter, FiPieChart, FiUsers } from "react-icons/fi";
import { Dropdown, Menu, Tooltip } from "antd";
import BoardView from "../../views/BoardView";

const TaskPage = (props) => {
  const { org, project, tasks, tabId } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState("tree");
  const views = [
    {
      name: "tree",
      icon: <BsListNested />,
      shortcutKey: "q",
    },
    {
      name: "board",
      icon: <IoStatsChartOutline />,
      shortcutKey: "b",
    },
  ];
  useEffect(() => {
    const viewNavigatorShortcut = (e) => {
      e.preventDefault();
      if (e.ctrlKey && e.key === "q") {
        navigate(`/w/p/${tabId}/tree${location.search}`);
      } else if (e.ctrlKey && e.key === "b") {
        navigate(`/w/p/${tabId}/board${location.search}`);
      }
    };
    document.addEventListener("keyup", viewNavigatorShortcut, false);
  }, []);
  return (
    <div className="task-pg relative">
      <header className="task-header w-full flex items-center left-0 px-14 justify-between fixed">
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: "Active tasks",
                  key: "active_tasks",
                  icon: <FiPieChart />,
                },
                {
                  label: "All Tasks",
                  key: "all_tasks",
                  icon: <BsListStars />,
                },
                {
                  label: "My Tasks",
                  key: "my_tasks",
                  icon: <AiOutlineUser />,
                },
                {
                  label: "Group by assignee",
                  key: "group_by_assigne",
                  icon: <FiUsers />,
                },
              ]}
            />
          }
          trigger={["click"]}
        >
          <div
            style={{ gap: ".57px" }}
            className="flex cursor-pointer filter-drop items-center"
          >
            <FiFilter />
            <div className="filter-name opacity-0 transition-all overflow-hidden w-1">
              <div className="min-w-max">
                <span>Active tasks</span>
              </div>
            </div>
            <IoMdArrowDropdown />
          </div>
        </Dropdown>

        <div className="flex views items-center gap-5">
          {views.map((view) => (
            <Tooltip
              placement="bottom"
              title={
                <p className=" capitalize m-0">
                  {view.name}{" "}
                  <span className=" w-1 h-1 px-1 bg-gray-100/10 rounded-full text-gray-100">
                    Ctrl + {view.shortcutKey}
                  </span>
                </p>
              }
              key={view.name}
            >
              <i
                onClick={() => {
                  navigate(`/w/p/${tabId}/${view.name}${location.search}`);
                }}
                className={`${view.name === currentView && "active"}`}
              >
                {view.icon}
              </i>
            </Tooltip>
          ))}
        </div>
      </header>
      <div className="pt-14">
        <Routes>
          <Route
            path="tree"
            element={
              <TreeView
                tasks={tasks}
                project={project}
                tabId={tabId}
                org={org}
                setCurrentView={setCurrentView}
              />
            }
          />
          <Route
            path="board"
            element={<BoardView setCurrentView={setCurrentView} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default TaskPage;
