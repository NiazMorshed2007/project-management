import React from "react";

const BaseInfo = (props) => {
  const { avatar, info } = props;
  return (
    <div className="base-info flex items-center gap-5">
      <div className="avatar-wrapper">
        <div className="avatar flex items-center justify-center w-52 h-52 rounded-full bg-brand">
          {avatar}
        </div>
      </div>
      <div className="info">{info}</div>
    </div>
  );
};

export default BaseInfo;
