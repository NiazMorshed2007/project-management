import React from "react";

const ProjectLists = (props) => {
  const { tasks } = props;
  console.log(tasks);
  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <p key={task}>{task}</p>
      ))}
    </div>
  );
};

export default ProjectLists;
