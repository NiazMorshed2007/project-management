import { Dropdown, Menu, Tooltip } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiCut, BiPaste } from "react-icons/bi";
import {
  BsArrowDown,
  BsArrowUp,
  BsCalendar3,
  BsCheck2All,
  BsCircle,
  BsListNested,
  BsListUl,
  BsTag,
  BsThreeDots,
  BsTrash,
} from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { GrActions } from "react-icons/gr";
import { IoMdArrowDropright } from "react-icons/io";
import { db } from "../firebase/firebase";
import updateOrganizations from "../functions/updateOrganizations";

const Task = (props) => {
  const { style, task_name, type, project, org, task_id, task_priority } =
    props;
  const priority_items = [
    {
      name: "Urgent",
      id: "urgent",
      icon: <BsArrowUp className="text-red-500" />,
    },
    {
      name: "High",
      id: "high",
      icon: <BsArrowUp className="text-yellow-500" />,
    },
    {
      name: "None",
      id: "None",
      icon: <BsArrowUp />,
    },
    {
      name: "Low",
      id: "low",
      icon: <BsArrowDown className="text-blue-500" />,
    },
  ];
  const handleDeleteTask = (id) => {
    const index = project.tasks.findIndex((task) => {
      return task.task_id === id;
    });
    project.tasks.splice(index, 1);
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
  };
  const handlePriority = (id, priority) => {
    const index = project.tasks.findIndex((task) => {
      return task.task_id === id;
    });
    project.tasks[index].task_priority = priority;
    console.log(project.tasks[index]);
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
  };
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
                  onClick: () => {
                    handleDeleteTask(task_id);
                  },
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
            className="task border-b py-1 px-2 pl-7 transition-all relative hover:bg-gray-100 cursor-pointer border-gray-300"
          >
            {task_name}
            <div className="absolute px-2 before-actions flex items-center gap-2 top-0 h-full left-0 -translate-x-full">
              <Tooltip title="Complete" placement="bottom">
                <i>
                  <BsCircle />
                </i>
              </Tooltip>
              <Dropdown
                overlay={
                  <Menu
                    items={[
                      {
                        label: "Urgent",
                        icon: <BsArrowUp className="text-red-500" />,
                        key: "urgent",
                        onClick: () => {
                          handlePriority(task_id, "urgent");
                        },
                      },
                      {
                        label: "High",
                        icon: <BsArrowUp className="text-yellow-500" />,
                        key: "high",
                        onClick: () => {
                          handlePriority(task_id, "high");
                        },
                      },
                      {
                        label: "None",
                        icon: <BsArrowUp />,
                        key: "none",
                        onClick: () => {
                          handlePriority(task_id, "none");
                        },
                      },
                      {
                        label: "Low",
                        icon: <BsArrowDown className="text-blue-500" />,
                        key: "low",
                        onClick: () => {
                          handlePriority(task_id, "low");
                        },
                      },
                    ]}
                  />
                }
                trigger={["click"]}
              >
                <Tooltip title="Priority" placement="bottom">
                  <i>
                    {task_priority === "urgent" && (
                      <BsArrowUp className="text-red-500" />
                    )}
                    {task_priority === "high" && (
                      <BsArrowUp className="text-yellow-500" />
                    )}
                    {task_priority === "none" && <BsArrowUp />}
                    {task_priority === "low" && (
                      <BsArrowDown className="text-blue-500" />
                    )}
                  </i>
                </Tooltip>
              </Dropdown>
            </div>
            <div className="absolute abs-actions h-full top-0 right-0 flex items-center gap-20 px-7">
              <Tooltip placement="bottom" title="Set Tag">
                <i>
                  <BsTag />
                </i>
              </Tooltip>
              <Tooltip placement="bottom" title="Date">
                <i>
                  <BsCalendar3 />
                </i>
              </Tooltip>
              <Tooltip placement="bottom" title="Assignee">
                <i>
                  <AiOutlineUser />
                </i>
              </Tooltip>
            </div>
          </div>
        </Dropdown>
      )}
    </>
  );
};

export default Task;
