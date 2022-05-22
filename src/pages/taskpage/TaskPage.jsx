import React from "react";
import { Route, Routes } from "react-router-dom";
import TreeView from "../../views/TreeView";

const TaskPage = (props) => {
  const { org, project, tasks, tabId } = props;

  return (
    <>
      <header className="task-header w-full flex items-center left-0 px-14 justify-between fixed">
        <div>Filter</div>
        <div>views</div>
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
              />
            }
          />
          <Route path="board" element={<TreeView />} />
        </Routes>
      </div>
    </>
  );
};

export default TaskPage;
