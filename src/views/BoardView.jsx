import { Progress } from "antd";
import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Task from "../components/task/Task";
import TaskCircle from "../components/TaskCircle";

const BoardView = (props) => {
  const { setCurrentView, tasks, project, org, tabId } = props;
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
              <div className="body  bg-gray-100/70 h-full flex flex-col gap-2">
                <Scrollbars
                  autoHeight
                  autoHide
                  autoHeightMin={0}
                  autoHeightMax={355}
                  style={{ width: 100 + "%" }}
                >
                  {tasks &&
                    tasks
                      .filter((task) => {
                        return task.task_status === status_board.id;
                      })
                      .map((task) => (
                        <div className="m-2" key={task.task_id}>
                          <Task
                            type={"board"}
                            project={project}
                            org={org}
                            {...task}
                          />
                        </div>
                      ))}
                </Scrollbars>
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
