import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const CreateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState({});
  const handleChange = () => {};
  const handleSubmit = () => [];
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log("search:", val);
  }
  useEffect(() => {
    const temp_org = userProfile.organizations.find((org) => {
      return org.org_id === id;
    });
    setOrg(temp_org);
  }, []);
  return (
    <>
      <h1 className="text-4xl">Create Project</h1>
      <form onSubmit={handleSubmit} className="mt-16 w-full">
        <div className="label-inp w-full">
          <input
            className="w-full"
            // value={name}
            onChange={handleChange}
            required
            id="name"
            name="name"
            type="text"
          />
          <label htmlFor="email">Project Name</label>
        </div>
        <div className="label-inp w-full">
          <span className="head">Organization</span>
          <Select
            showSearch
            placeholder="Select a organization"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            defaultValue={org.org_name}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {userProfile.organizations.map((org) => (
              <Option key={org.org_id} value={org.org_name}>
                {org.org_name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="label-inp">
          <span>Template</span>
        </div>
        <div className="button-wrapper mt-4 w-full justify-end flex gap-5">
          <Button htmlType="submit" className=" primary-btn-unfilled">
            Create
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            htmlType="cancel"
            className="default-btn-unfilled"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateProject;
