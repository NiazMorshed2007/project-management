import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import Task from "../components/task/Task";
import { db } from "../firebase/firebase";
import addTask from "../functions/addTask";
import { reorderArr } from "../functions/ReOrderArr";
import useClickOutside from "../hooks/useClickOutside";

const TreeView = (props) => {
  const { tasks, project, org, tabId, setCurrentView } = props;
  const [taskName, setTaskName] = useState("");
  const [showInput, setShowInput] = useState(false);
  let elemRef = useClickOutside(() => {
    setShowInput(false);
    addTask(taskName, project, org, tabId, setTaskName);
  });
  const handleAddtask = (e) => {
    e.preventDefault();
    addTask(taskName, project, org, tabId, setTaskName);
  };
  useEffect(() => {
    setCurrentView("tree");
  }, []);
  return (
    <div
      style={{
        paddingRight: "13%",
        paddingLeft: "13%",
      }}
      className="tasks-wrapper mt-5 pb-10"
    >
      <DragDropContext
        onDragEnd={(...param) => {
          const srcI = param[0].source.index;
          const desI = param[0].destination?.index;
          reorderArr(tasks, srcI, desI);
          updateDoc(doc(db, "organizations", project.org_serverId), {
            projects: org.projects,
          });
        }}
      >
        <Droppable droppableId="droppable-tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="border-t border-gray-200"
            >
              {tasks.map((task, i) => (
                <Draggable
                  key={task.task_name}
                  index={i}
                  draggableId={task.task_name}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="task-wrap"
                    >
                      <Task
                        project={project}
                        org={org}
                        type="tree"
                        isDragging={snapshot.isDragging}
                        style={{
                          borderTop: i === 0 && "1px rgb(74 164 51 / 0.05)",
                        }}
                        {...task}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
  );
};

export default TreeView;
