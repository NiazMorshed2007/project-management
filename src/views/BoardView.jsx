import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const BoardView = (props) => {
  const { setCurrentView, tasks, project, org, tabId } = props;
  const statuses = project && project.statuses;
  useEffect(() => {
    setCurrentView("board");
  });
  return (
    <div className="px-14">
      <div className="flex gap-5 w-max overflow-x-auto overflow-y-hidden">
        {statuses.map((status_board) => (
          <div
            key={status_board.id}
            className={
              " w-[360px] h-[465px] shadow-lg transition-all hover:shadow-xl cursor-pointer rounded-lg overflow-hidden border border-gray-200"
            }
          >
            <div className="header flex items-center justify-between p-5 bg-gray-100">
              <h1 className="text-lg font-normal text-gray-500 m-0">
                {status_board.name}
              </h1>
              <i className="cursor-pointer">
                <BsThreeDots />
              </i>
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
