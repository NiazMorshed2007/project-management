import React from "react";
import BaseInfo from "../../components/BaseInfo";
import { FiEdit2 } from "react-icons/fi";
import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

const OrgOverview = (props) => {
  const { org, current_orgId } = props;
  const navigate = useNavigate();
  const users = [
    {
      name: "MA",
      color: "#9dd862",
    },
    {
      name: "ZS",
      color: "#eb4263",
    },
    {
      name: "GT",
      color: "#1ab8de",
    },
    {
      name: "TA",
      color: "#05843e",
    },
    {
      name: "RA",
      color: "#9dd862",
    },
  ];
  return (
    <>
      {org && (
        <>
          <BaseInfo
            rounded={false}
            avatar={
              <>
                {/* {org.avatar &&org.avatar ? (
                <img src={org.avatar} alt="avatar" />
              ) : ( */}
                <h1 className=" text-white text-7xl m-0">{org.org_logoText}</h1>
                {/* )} */}
              </>
            }
            info={
              <>
                <p className="text-lg text-secondary/50 m-0 uppercase">
                  organization
                </p>
                <h1 className="text-4xl mb-1">{org.org_name}</h1>
                <p className="text-base text-secondary mb-2">
                  Created on {org.createdOn}
                </p>
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
          <div className="projects-wrapper py-9">
            <h2 className=" text-xl mb-4">Project Summary</h2>
            {org.projects && (
              <>
                {org.projects.length < 1 ? (
                  <div className="mb-5 text-sm bg-gray-100 rounded-lg text-secondary py-3 text-center p-2">
                    You don't have any projects. Add one to get started... 👇
                  </div>
                ) : (
                  <DragDropContext
                    onDragEnd={(...param) => {
                      const srcI = param[0].source.index;
                      const desI = param[0].destination?.index;
                    }}
                  >
                    <Droppable
                      droppableId={"droppable-1"}
                      direction={"horizontal"}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          className="flex items-center gap-7"
                          {...provided.droppableProps}
                        >
                          {org.projects.map((project, i) => (
                            <Draggable
                              key={project.project_id + "-" + i}
                              draggableId={"draggable-" + project.project_id}
                              index={i}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="w-4/12 flex items-center justify-between bg-white border border-gray-200 p-2 rounded-lg shadow-xl"
                                >
                                  <div>
                                    <h1
                                      onClick={() => {
                                        navigate(
                                          `/w/p/overview?orgId=${org.org_id}&projectId=${project.project_id}`
                                        );
                                      }}
                                      className="transition-all inline-block text-md capitalize hover:text-brand cursor-pointer"
                                    >
                                      {project.project_name}
                                    </h1>
                                    <div className="text-xs">
                                      <p>
                                        <span className=" text-secondaryBrand">
                                          Total taks:
                                        </span>{" "}
                                        {project.tasks.length}
                                      </p>
                                      <p>
                                        <span className=" text-secondaryBrand">
                                          Total tabs:
                                        </span>{" "}
                                        {project.tabs.length}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs">Joined memebers</p>
                                    <div className="flex items-center gap-1">
                                      {users.map((u, i) => (
                                        <div key={u.name}>
                                          <div
                                            className={`avatar 
                                        relative w-6 h-6 p-2 flex items-center justify-center rounded-full`}
                                            style={{
                                              background: u.color,
                                              transform: `translateX(-${
                                                i * 7
                                              }px)`,
                                              zIndex: i,
                                            }}
                                          >
                                            <p className="m-0 text-xs text-white">
                                              {u.name}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>

                  // <div className="flex items-center gap-7">
                  //   {org.projects.map((project, index) => (
                  //     <div className="w-4/12 flex items-center justify-between bg-white border border-gray-200 p-2 rounded-lg shadow-xl">
                  //       <div>
                  //         <h1
                  //           onClick={() => {
                  //             navigate(
                  //               `/w/p/overview?orgId=${org.org_id}&projectId=${project.project_id}`
                  //             );
                  //           }}
                  //           className="transition-all inline-block text-md capitalize hover:text-brand cursor-pointer"
                  //         >
                  //           {project.project_name}
                  //         </h1>
                  //         <div className="text-xs">
                  //           <p>
                  //             <span className=" text-secondaryBrand">
                  //               Total taks:
                  //             </span>{" "}
                  //             {project.tasks.length}
                  //           </p>
                  //           <p>
                  //             <span className=" text-secondaryBrand">
                  //               Total tabs:
                  //             </span>{" "}
                  //             {project.tabs.length}
                  //           </p>
                  //         </div>
                  //       </div>
                  //       <div>
                  //         <p className="text-xs">Joined memebers</p>
                  //         <div className="flex items-center gap-1">
                  //           {users.map((u, i) => (
                  //             <div key={u.name}>
                  //               <div
                  //                 className={`avatar
                  //                       relative w-6 h-6 p-2 flex items-center justify-center rounded-full`}
                  //                 style={{
                  //                   background: u.color,
                  //                   transform: `translateX(-${i * 7}px)`,
                  //                   zIndex: i,
                  //                 }}
                  //               >
                  //                 <p className="m-0 text-xs text-white">
                  //                   {u.name}
                  //                 </p>
                  //               </div>
                  //             </div>
                  //           ))}
                  //         </div>
                  //       </div>
                  //     </div>
                  //   ))}
                  // </div>
                )}
              </>
            )}
            <Button
              onClick={() => {
                navigate(`/c/project/${current_orgId}`);
              }}
              size="small"
              icon={<AiOutlinePlus />}
              className="primary-btn-unfilled mt-4"
            >
              Add Project
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default OrgOverview;
