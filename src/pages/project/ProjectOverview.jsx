import React from "react";
import { FiEdit2 } from "react-icons/fi";
import BaseInfo from "../../components/BaseInfo";

const ProjectOverview = (props) => {
  const { project } = props;
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
                <p className="text-base text-secondary mb-2">
                  Created on {project.createdOn}
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
        </>
      )}
    </>
  );
};

export default ProjectOverview;
