import { Dropdown, Menu, Tooltip } from "antd";
import React from "react";

const TaskByPriority = (props) => {
  const { task_priority, items, priority_items } = props;

  return (
    <Dropdown overlay={<Menu items={items} />} trigger={["click"]}>
      <Tooltip mouseEnterDelay={1} title="Priority" placement="bottom">
        <i className={`${task_priority !== "none" && "visib"}`}>
          {task_priority === "urgent" && priority_items[0].icon}
          {task_priority === "high" && priority_items[1].icon}
          {task_priority === "none" && priority_items[2].icon}
          {task_priority === "low" && priority_items[3].icon}
        </i>
      </Tooltip>
    </Dropdown>
  );
};

export default TaskByPriority;
