import React from "react";
import BaseInfo from "../../components/BaseInfo";
import { FiEdit2 } from "react-icons/fi";

const OrgOverview = (props) => {
  const { org } = props;
  //   console.log(org);
  return (
    <>
      {org && (
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
                Created at hgfsjfs
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
      )}
    </>
  );
};

export default OrgOverview;
