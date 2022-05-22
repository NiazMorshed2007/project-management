import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TreeView from "../../views/TreeView";
import { IoStatsChartOutline } from "react-icons/io5";
import { BsListNested } from "react-icons/bs";
import { Tooltip } from "antd";
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
        <div>Filter</div>
        <div className="flex views items-center gap-5">
          {views.map((view) => (
            <Tooltip
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
      <div className="mt-5 pt-1">
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
