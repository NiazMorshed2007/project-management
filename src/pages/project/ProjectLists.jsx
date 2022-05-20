import React, { useEffect } from "react";
import TaskPage from "../taskpage/TaskPage";

const ProjectLists = (props) => {
  const { tasks, org, project } = props;
  useEffect(() => {
    console.log(tasks);
  }, []);
  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <p key={task}>{task}</p>
      ))}
      <TaskPage />
    </div>
  );
};

export default ProjectLists;
