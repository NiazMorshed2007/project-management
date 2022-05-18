import React from "react";
import BaseInfo from "../../components/BaseInfo";
import { FiEdit2 } from "react-icons/fi";
import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const OrgOverview = (props) => {
  const { org, current_orgId } = props;
  const navigate = useNavigate();
  //   console.log(org);
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
            <h2 className=" text-xl">Project Summary</h2>
            {org.projects && (
              <>
                {org.projects.length < 1 ? (
                  <div className="mb-5 text-sm bg-gray-100 rounded-lg text-secondary py-3 text-center p-2">
                    You don't have any projects. Add one to get started... 👇
                  </div>
                ) : (
                  <>
                    {org.projects.map((project) => (
                      <div key={project.project_id}>
                        <p
                          onClick={() => {
                            navigate(
                              `/w/p/overview?orgId=${org.org_id}&projectId=${project.project_id}&active_tabId=overview`
                            );
                          }}
                          className="transition-all hover:text-brand cursor-pointer"
                        >
                          {project.project_name}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
            <Button
              onClick={() => {
                navigate(`/c/project/${current_orgId}`);
              }}
              size="small"
              icon={<AiOutlinePlus />}
              className="primary-btn-unfilled"
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
