import { Progress } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { Scrollbars } from "react-custom-scrollbars";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Task from "../components/task/Task";
import TaskCircle from "../components/TaskCircle";
import { db } from "../firebase/firebase";
import { reorderArr } from "../functions/ReOrderArr";

const BoardView = (props) => {
  const { setCurrentView, tasks, project, org } = props;
  const statuses = project && project.statuses;
  useEffect(() => {
    setCurrentView("board");
  });
  return (
    <div className="px-14">
      <div className="flex gap-5 w-max overflow-x-auto overflow-y-hidden">
        {statuses &&
          statuses.map((status_board) => (
            <div
              key={status_board.id}
              style={{
                maxHeight: "460px",
              }}
              className={
                " w-[360px] h-max shadow-lg transition-all hover:shadow-xl cursor-pointer rounded-lg overflow-hidden border border-gray-200"
              }
            >
              <div className="header h-14 flex items-center justify-between p-5 border-b">
                <div className="flex items-center">
                  <TaskCircle progress={status_board.progress} />
                  <h1 className="text-lg ml-2 font-normal text-gray-500 m-0">
                    {status_board.name}
                  </h1>
                </div>
                <i className="cursor-pointer">
                  <BsThreeDots />
                </i>
              </div>
              <div className="overflow-auto">
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
                  <Droppable droppableId="droppable-board-tasks">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="body bg-gray-100/70 h-full flex flex-col gap-2"
                      >
                        {/* <Scrollbars
                          autoHeight
                          autoHide
                          autoHeightMin={0}
                          autoHeightMax={355}
                          style={{ width: 100 + "%" }}
                        > */}
                        {tasks &&
                          tasks
                            .filter((task) => {
                              return task.task_status === status_board.id;
                            })
                            .map((task, i) => (
                              <Draggable
                                key={task.task_name}
                                index={i}
                                draggableId={task.task_name}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="m-2"
                                  >
                                    <Task
                                      type={"board"}
                                      project={project}
                                      org={org}
                                      {...task}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        {/* </Scrollbars> */}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
              <div className="footer flex items-center bg-gray-100/70">
                <h1 className="text-sm p-2 py-3 flex items-center gap-1 font-light hover:text-gray-500 cursor-pointer text-gray-400">
                  <AiOutlinePlus />
                  <span>Add Tasks</span>
                </h1>
              </div>
            </div>
          ))}
        <div className="add-status mt-7 ml-4 h-max">
          <h1 className="text-lg flex items-center gap-1 font-normal hover:text-gray-500 cursor-pointer text-gray-400">
            <AiOutlinePlus />
            <span>Add status</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
