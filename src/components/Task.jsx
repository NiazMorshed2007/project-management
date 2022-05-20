import { Dropdown, Menu } from "antd";
import React from "react";

const Task = (props) => {
  const { style, task_name } = props;
  return (
    <Dropdown
      trigger={["contextMenu"]}
      overlay={
        <Menu
          items={[
            {
              label: "sjaghf",
              key: "sdf",
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
  );
};

export default Task;
