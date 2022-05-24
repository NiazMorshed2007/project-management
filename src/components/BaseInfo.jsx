import React from "react";

const BaseInfo = (props) => {
  const { avatar, info, actions, rounded } = props;
  return (
    <div className="base-info border-b bordr-gray-200 pb-8 w-full flex items-center gap-8">
      <div className="avatar-wrapper">
        <div
          className={`avatar flex items-center justify-center w-40 h-40 ${
            rounded ? "rounded-full" : "rounded-lg"
          } bg-secondaryBrand`}
        >
          {avatar}
        </div>
      </div>
      <div className="info-wrapper w-4/5">
        <div className="flex justify-between">
          <div className="info">{info}</div>
          <div className="actions">{actions}</div>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
