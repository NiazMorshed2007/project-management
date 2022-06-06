import React, { useEffect, useState } from "react";
import { BsCircle } from "react-icons/bs";
import { FcOk } from "react-icons/fc";

const TaskCircle = (props) => {
  const { progress } = props;
  const [calPrg, setCalPrg] = useState(0);
  const strokeArraryNum = 53;
  useEffect(() => {
    if (progress !== 0 || progress !== 100) {
      let p;
      p = strokeArraryNum - Math.floor((progress * strokeArraryNum) / 100);
      setCalPrg(p);
    }
  }, [progress]);
  return (
    <>
      {progress === 0 ? (
        <BsCircle className="fill-gray-400 text-lg" />
      ) : progress === 100 ? (
        <FcOk className="text-xl" />
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="25px"
            height="32px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stop-color="#05843e" />
                <stop offset="100%" stop-color="#4aa433" />
              </linearGradient>
            </defs>
            <circle
              className=" stroke-gray-400"
              style={{
                fill: "none",
                strokeWidth: "1.5px",
                strokeDasharray: strokeArraryNum,
                strokeDashoffset: 0,
                transition: "all .3s ease-in-out",
              }}
              cx="15"
              cy="15"
              r="8.5"
              stroke-linecap="round"
            />
            <circle
              className="relative"
              style={{
                stroke: "url(#GradientColor)",
                fill: "none",
                strokeWidth: "1.5px",
                strokeDasharray: strokeArraryNum,
                strokeDashoffset: calPrg,
                transition: "all .3s ease-in-out",
                zIndex: 50,
              }}
              cx="15"
              cy="15"
              r="8.5"
              stroke-linecap="round"
            />
          </svg>
        </>
      )}
    </>
  );
};

export default TaskCircle;
