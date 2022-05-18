import { Button, Form, Input, Select } from "antd";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SetGlobalLoading } from "../../actions";
import { db } from "../../firebase/firebase";
import { generateId } from "../../functions/idGenerator";
import { generateLogoText } from "../../functions/LogoText";
import { getTime } from "../../functions/Time";

const { Option } = Select;

const CreateProject = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    let docId = "";
    let org = {};
    dispatch(SetGlobalLoading(true));
    const project_data = {
      project_name: values.name,
      project_id: generateId(values.name),
      project_logoText: generateLogoText(values.name),
      project_avatar: null,
      tabs: [],
    };
    const q = query(
      collection(db, "organizations"),
      where("org_id", "==", generateId(values.selected_org)),
      where("owner_id", "==", userProfile.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docId = doc.id;
      org = doc.data();
    });
    await addDoc(collection(db, "projects"), {
      ...project_data,
      parent_org_id: org.org_id,
      createdOn: getTime("m/d/y"),
      owner_id: userProfile.uid,
    });
    await updateDoc(doc(db, "organizations", docId), {
      projects: arrayUnion({
        ...project_data,
      }),
    });
    dispatch(SetGlobalLoading(false));
    form.resetFields();
    window.alert("Succesfull");
  };
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log("search:", val);
  }
  useEffect(() => {}, [id]);
  return (
    <>
      <h1 className="text-4xl">Create Project</h1>
      <Form
        form={form}
        onFinish={handleSubmit}
        requiredMark={"optional"}
        layout="vertical"
      >
        <Form.Item
          label={"Project Name"}
          name={"name"}
          rules={[
            { required: true, message: "Please input your Project Name!" },
          ]}
        >
          <Input placeholder="Project Name" />
        </Form.Item>
        <Form.Item
          label="Organization"
          name={"selected_org"}
          rules={[{ required: true, message: "Please select a organization" }]}
        >
          <Select
            showSearch
            placeholder="Select a organization"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
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
        </Form.Item>
        <Form.Item>
          <div className="flex items-center justify-end gap-3">
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
        </Form.Item>
      </Form>
      {/* <form onSubmit={handleSubmit} className="mt-16 w-full">
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
      </form> */}
    </>
  );
};

export default CreateProject;
