import "chart.js/auto";
import React, { useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BaseInfo from "../../components/BaseInfo";

const ProjectOverview = (props) => {
  const { project, org } = props;
  const navigate = useNavigate();
  const todoTasks =
    project &&
    project.tasks.filter((task) => {
      return task.task_status === "todo";
    });

  const data = {
    labels: ["Todo", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [todoTasks.length],
        backgroundColor: [
          "#ededed",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  const options = {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    // scales: {
    //   y: {
    //     grid: {
    //       borderWidth: 0,
    //     },
    //     ticks: {
    //       stepSize: 5,
    //     },
    //   },
    //   x: {
    //     grid: {
    //       display: false,
    //     },
    //   },
    // },
  };
  return (
    <>
      {project && (
        <>
          <BaseInfo
            rounded={false}
            avatar={
              <>
                {/* {org.avatar &&org.avatar ? (
                <img src={org.avatar} alt="avatar" />
              ) : ( */}
                <h1 className=" text-white text-7xl m-0">
                  {project.project_logoText}
                </h1>
                {/* )} */}
              </>
            }
            info={
              <>
                <p className="text-lg text-secondary/50 m-0 uppercase">
                  project
                </p>
                <h1 className="text-4xl mb-1">{project.project_name}</h1>
                <div className="flex items-center gap-2">
                  <p
                    className="m-0 text-base cursor-pointer transition-all hover:text-brand"
                    onClick={() => {
                      navigate(`/w/o/overview?orgId=${org.org_id}`);
                    }}
                  >
                    {org.org_name}
                  </p>
                  <li className="text-base text-secondary">
                    Created on {project.createdOn}
                  </li>
                </div>
              </>
            }
            actions={
              <>
                <i className="cursor-pointer">
                  <FiEdit2 />
                </i>
              </>
            }
          />
          <div className="stats mt-9">
            <h1 className="text-xl">Progress Stats</h1>
            <div className="flex mt-9">
              <div className="w-1/2">
                <PolarArea
                  data={data}
                  options={options}
                  height={200}
                  width={300}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectOverview;
