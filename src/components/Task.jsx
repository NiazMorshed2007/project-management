import { Dropdown, Menu } from "antd";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiCut, BiPaste } from "react-icons/bi";
import { FiCopy } from "react-icons/fi";
import { GrActions } from "react-icons/gr";
import { IoMdArrowDropright } from "react-icons/io";
import {
  BsCircle,
  BsTag,
  BsArrowUp,
  BsListUl,
  BsCheck2All,
  BsListNested,
  BsTrash,
  BsThreeDots,
} from "react-icons/bs";

const Task = (props) => {
  const { style, task_name, type } = props;
  return (
    <>
      {type === "tree" && (
        <Dropdown
          trigger={["contextMenu"]}
          overlay={
            <Menu
              items={[
                {
                  label: "Set assignee",
                  key: "assign",
                  icon: <AiOutlineUser />,
                },
                {
                  label: "Set status",
                  icon: <BsCircle />,
                  key: "status",
                },
                {
                  label: "Set tag",
                  key: "tag",
                  icon: <BsTag />,
                },
                {
                  label: "Set priority",
                  key: "priority",
                  icon: <BsArrowUp />,
                },
                {
                  label: "Set sublist",
                  icon: <BsListUl />,
                  key: "sublist",
                },
                {
                  type: "divider",
                },
                {
                  label: (
                    <div className="flex items-center justify-between">
                      <p className="m-0">Actions</p>
                      <div className="ml-3">
                        <IoMdArrowDropright />
                      </div>
                    </div>
                  ),
                  type: "sub-menu",
                  icon: <GrActions />,
                  children: [
                    {
                      label: (
                        <div className="flex items-center justify-between">
                          <p className="m-0">Cut</p>
                          <div className="ml-3">
                            <kbd>Ctrl</kbd> + <kbd>X</kbd>
                          </div>
                        </div>
                      ),
                      icon: <BiCut />,
                      key: "cut",
                    },
                    {
                      label: (
                        <div className="flex items-center justify-between">
                          <p className="m-0">Copy</p>
                          <div className="ml-3">
                            <kbd>Ctrl</kbd> + <kbd>C</kbd>
                          </div>
                        </div>
                      ),
                      icon: <FiCopy />,
                      key: "copy",
                    },
                    {
                      label: (
                        <div className="flex items-center justify-between">
                          <p className="m-0">Paste</p>
                          <div className="ml-3">
                            <kbd>Ctrl</kbd> + <kbd>V</kbd>
                          </div>
                        </div>
                      ),
                      icon: <BiPaste />,
                      key: "paste",
                    },
                  ],
                },
                {
                  type: "divider",
                },
                {
                  label: (
                    <div className="flex items-center justify-between">
                      <p className="m-0">Select all relevant tasks</p>
                      <div className="ml-3">
                        <kbd>Ctrl</kbd> + <kbd>E</kbd>
                      </div>
                    </div>
                  ),
                  icon: <BsCheck2All />,
                  key: "relvnt-tasks",
                },
                {
                  label: (
                    <div className="flex items-center justify-between">
                      <p className="m-0">Add subtask</p>
                      <div className="ml-3">
                        <kbd>Shift</kbd> + <kbd>ENTER</kbd>
                      </div>
                    </div>
                  ),
                  icon: <BsListNested />,
                  key: "subtasks",
                },
                {
                  type: "divider",
                },
                {
                  label: (
                    <div className="flex items-center justify-between">
                      <p className="m-0">Delete</p>
                      <div className="ml-3">
                        <kbd>Ctrl</kbd> + <kbd>DEL</kbd>
                      </div>
                    </div>
                  ),
                  icon: <BsTrash />,
                  key: "delete",
                },
                {
                  label: "More",
                  key: "more",
                  icon: <BsThreeDots />,
                },
              ]}
            />
          }
        >
          <div
            style={{
              ...style,
            }}
            className="task border-b py-1 px-2 pl-7 transition-all hover:bg-secondaryBrand/5 cursor-pointer border-gray-300"
          >
            {task_name}
          </div>
        </Dropdown>
      )}
    </>
  );
};

export default Task;
