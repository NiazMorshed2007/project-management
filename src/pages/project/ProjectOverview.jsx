import "chart.js/auto";
import React, { useState } from "react";
import { Pie, PolarArea } from "react-chartjs-2";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BaseInfo from "../../components/BaseInfo";
import JoinedMembers from "../../components/JoinedMembers";

const ProjectOverview = (props) => {
  const { project, org } = props;
  const navigate = useNavigate();
  const statuses = [
    [
      {
        name: "Todo",
        key: "todo",
        color: "#ededed",
      },
      {
        name: "In Progress",
        key: "in_progress",
        color: "#9dd862",
      },
      {
        name: "Completed",
        key: "completed",
        color: "#05843e",
      },
    ],
    [
      {
        name: "Urgent",
        key: "urgent",
        color: "#eb4263",
      },
      {
        name: "High",
        key: "high",
        color: "#ffc20f",
      },
      {
        name: "None",
        key: "none",
        color: "#ededed",
      },
      {
        name: "Low",
        key: "low",
        color: "#1ab8de",
      },
    ],
  ];
  const filteredTasks = (field, stat) => {
    if (project.tasks) {
      const tasks =
        project.tasks &&
        project.tasks.filter((task) => {
          return task[field] === stat;
        });
      return tasks && tasks;
    } else {
      return [];
    }
  };
  const dataByStatus = {
    labels: [statuses[0][0].name, statuses[0][1].name, statuses[0][2].name],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          filteredTasks("task_status", "todo").length,
          filteredTasks("task_status", "in_progress").length,
          filteredTasks("task_status", "completed").length,
        ],
        backgroundColor: [
          statuses[0][0].color,
          statuses[0][1].color,
          statuses[0][2].color,
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
  };
  const dataByPriority = {
    labels: [
      statuses[1][0].name,
      statuses[1][1].name,
      statuses[1][2].name,
      statuses[1][3].name,
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          filteredTasks("task_priority", "urgent").length,
          filteredTasks("task_priority", "high").length,
          filteredTasks("task_priority", "none").length,
          filteredTasks("task_priority", "low").length,
        ],
        backgroundColor: [
          statuses[1][0].color,
          statuses[1][1].color,
          statuses[1][2].color,
          statuses[1][3].color,
        ],
      },
    ],
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
          <section className="stats py-9 border-b">
            <h1 className="text-xl">Progress Stats</h1>
            <div className="flex mt-9 gap-11">
              <div className="w-4/12">
                <h1 className="ml-4 text-lg">By task status</h1>
                <Pie
                  data={dataByStatus}
                  options={options}
                  height={80}
                  width={150}
                />
              </div>
              <div className="w-4/12">
                <h1 className="ml-4 text-lg">By task priority</h1>
                <PolarArea
                  data={dataByPriority}
                  options={options}
                  height={150}
                  width={150}
                />
              </div>
              <div className="ml-7">
                <h1 className="text-lg mb-4">Indicators</h1>
                <div className="mb-5">
                  {statuses[0].map((s) => (
                    <div className="flex mb-2 items-center gap-2" key={s.key}>
                      <div
                        style={{
                          background: s.color,
                        }}
                        className={`dot w-2 h-2 rounded-full`}
                      ></div>
                      <p className="mb-0 text-sm">{s.name}</p>
                    </div>
                  ))}
                </div>
                <div className="mb-5">
                  {statuses[1].map((s) => (
                    <div className="flex mb-2 items-center gap-2" key={s.key}>
                      <div
                        style={{
                          background: s.color,
                        }}
                        className={`dot w-2 h-2 rounded-full`}
                      ></div>
                      <p className="mb-0 text-sm">{s.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* members section */}
          <section className="py-10">
            <h1 className="text-xl">Joined Members</h1>
            <div className="flex items-center gap-3 mt-5">
              <JoinedMembers />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProjectOverview;
