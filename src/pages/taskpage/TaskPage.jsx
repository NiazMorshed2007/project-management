import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import Task from "../../components/Task";
import { db } from "../../firebase/firebase";
import { generateId } from "../../functions/idGenerator";

const TaskPage = (props) => {
  const { org, project, tasks, tabId } = props;
  const [taskName, setTaskName] = useState("");
  const elemRef = useRef();
  const [showInput, setShowInput] = useState(false);
  const handleAddtask = (e) => {
    console.log(project);
    e.preventDefault();
    const newTask = {
      task_name: taskName,
      task_id: generateId(taskName) + (Math.random() * 1000).toString(),
      tabId: tabId,
    };
    project.tasks.push({
      ...newTask,
    });
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
    setTaskName("");
  };
  return (
    <>
      <div className="tasks-wrapper mt-10">
        <div className="border-t border-gray-200">
          {tasks.map((task, index) => (
            <div key={task.id} className="task-wrap">
              <Task
                style={{
                  borderTop: index === 0 && "1px rgb(74 164 51 / 0.05)",
                }}
                {...task}
              />
            </div>
          ))}
        </div>
        {/* {tasks.length < 1 && ( */}
        <div className="relative">
          <p
            onClick={() => {
              setShowInput(true);
              console.log("clicked");
            }}
            className="hover:text-secondary py-2 transition-all cursor-pointer border-b border-gray-200 pb-1 mb-0"
          >
            Click here to add task
          </p>
          {showInput && (
            <form
              ref={elemRef}
              className="absolute px-5 pr-20 bg-taskSelectedBack h-full w-full border-b top-0 left-0"
              onSubmit={handleAddtask}
            >
              <input
                className="h-full px-2 placeholder:font-light outline-none w-full border border-brand rounded"
                type="text"
                placeholder="Enter a task name"
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                }}
              />
            </form>
          )}
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default TaskPage;
