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
import { db } from "../../firebase/firebase";
import findIndexTasksById from "../../functions/findIndexTasksById";
import TaskCircle from "../TaskCircle";
import TaskByPriority from "./TaskByPriority";

const Task = (props) => {
  const {
    style,
    task_name,
    isDragging,
    type,
    project,
    org,
    task_id,
    task_status,
    task_progress,
    task_priority,
    task_tabId,
  } = props;
  // fixed priority items
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
      id: "none",
      icon: <BsArrowUp className="text-gray-500" />,
    },
    {
      name: "Low",
      id: "low",
      icon: <BsArrowDown className="text-blue-500" />,
    },
  ];

  // actions that can users trigger in this component

  const handleUpdateTask = (target, val) => {
    const index = findIndexTasksById(project.tasks, task_id);
    project.tasks[index] = {
      ...project.tasks[index],
      [target]: val,
    };
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
  };

  const handleDeleteTask = () => {
    const index = findIndexTasksById(project.tasks, task_id);
    project.tasks.splice(index, 1);
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
  };

  // sub-menu data functions down here. Mapping thorough arrays to create a json object for antd menu items

  const priorityData = () => {
    var items = [];
    // eslint-disable-next-line
    priority_items.map((item) => {
      items.push({
        label: item.name,
        key: item.id,
        icon: item.icon,
        style: {
          color: task_priority === item.id && "#05843e",
        },
        onClick: () => {
          handleUpdateTask("task_priority", item.id);
        },
      });
    });
    return items;
  };

  const statuses_data = () => {
    const items = [];
    // eslint-disable-next-line
    project.statuses &&
      project.statuses.map((status) => {
        items.push({
          label: status.name,
          key: status.id,
          style: {
            color: status.id === task_status && "#05843e",
          },
          onClick: () => {
            handleUpdateTask("task_status", status.id);
            handleUpdateTask("task_progress", status.progress);
          },
        });
      });
    return items;
  };

  const available_sublists = () => {
    const sublists = [];
    // eslint-disable-next-line
    project.tabs.map((tab) => {
      sublists.push({
        label: "Set to " + tab.name,
        key: tab.id,
        style: {
          color: task_tabId === tab.id && "#05843e",
        },
        icon: <BsListNested />,
        onClick: () => {
          handleUpdateTask("task_tabId", tab.id);
        },
      });
    });
    return sublists;
  };

  // re-usable menu
  const taskContextMenu = [
    {
      label: "Set assignee",
      key: "assign",
      icon: <AiOutlineUser />,
    },
    {
      label: (
        <div className="flex items-center justify-between">
          <p className="m-0">Set status</p>
          <div className="ml-3">
            <IoMdArrowDropright />
          </div>
        </div>
      ),
      icon: <BsCircle />,
      key: "status",
      type: "sub-menu",
      children: [...statuses_data()],
    },
    {
      label: "Set tag",
      key: "tag",
      icon: <BsTag />,
    },
    {
      label: (
        <div className="flex items-center justify-between">
          <p className="m-0">Set priority</p>
          <div className="ml-3">
            <IoMdArrowDropright />
          </div>
        </div>
      ),
      key: "priority",
      icon: <BsArrowUp />,
      type: "sub-menu",
      children: [...priorityData()],
    },
    {
      label: (
        <div className="flex items-center justify-between">
          <p className="m-0">Set sublist</p>
          <div className="ml-3">
            <IoMdArrowDropright />
          </div>
        </div>
      ),
      icon: <BsListUl />,
      key: "sublist",
      type: "sub-menu",
      children: [...available_sublists()],
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
        handleDeleteTask();
      },
      icon: <BsTrash />,
      key: "delete",
    },
    {
      label: "More",
      key: "more",
      icon: <BsThreeDots />,
    },
  ];

  return (
    <>
      {type === "tree" && (
        <Dropdown
          trigger={["contextMenu"]}
          overlay={<Menu items={taskContextMenu} />}
        >
          <div
            style={{
              ...style,
              padding: "6px 10px",
              paddingLeft: "15px",
              width: isDragging ? "25%" : "100%",
              border: isDragging && "1px solid #05843e",
              transform: isDragging ? "translateX(40%)" : "translateX(0)",
              transition: "all .3s ease-in-out",
            }}
            className={`task bg-white ${
              isDragging && "shadow-md"
            } border-b pl-7 relative hover:bg-gray-100 cursor-pointer border-gray-300 `}
          >
            {task_status === "completed" ? (
              <del>{task_name}</del>
            ) : (
              <p className="m-0">{task_name}</p>
            )}
            <div
              className={`absolute px-2 before-actions flex items-center gap-2 top-0 h-full left-0 -translate-x-full ${
                isDragging && "hidden"
              }`}
            >
              <Tooltip mouseEnterDelay={1} title="Complete" placement="bottom">
                <i className={`${task_status !== "todo" && "visib"}`}>
                  <TaskCircle progress={task_progress} />
                </i>
              </Tooltip>
              <TaskByPriority
                task_priority={task_priority}
                items={[...priorityData()]}
                priority_items={priority_items}
              />
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
      {type === "board" && (
        <Dropdown
          trigger={["contextMenu"]}
          overlay={<Menu items={taskContextMenu} />}
        >
          <div className=" task flex flex-col pb-3 justify-between task-b bg-white transition-all hover:shadow-md shadow-sm w-full p-2 rounded-sm h-20 border">
            <div className="flex items-center gap-2">
              <TaskCircle progress={task_progress} />
              {task_status === "completed" ? (
                <del className=" text-gray-500">{task_name}</del>
              ) : (
                <p className="m-0">{task_name}</p>
              )}
            </div>
            <div className="actions text-gray-500 before-actions flex items-center gap-3 px-1">
              <TaskByPriority
                task_priority={task_priority}
                items={[...priorityData()]}
                priority_items={priority_items}
              />
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
