import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BaseInfo from "../../components/BaseInfo";

const ProjectOverview = (props) => {
  const { project, org } = props;
  const navigate = useNavigate();
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
                <p className="m-0 text-base cursor-pointer transition-all hover:text-brand" onClick={() => {
                    navigate(`/w/o/overview?orgId=${org.org_id}`)
                }}>{org.org_name}</p>
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
        </>
      )}
    </>
  );
};

export default ProjectOverview;
