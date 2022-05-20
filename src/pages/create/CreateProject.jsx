import { Button, Form, Input, Select } from "antd";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SetGlobalLoading } from "../../actions";
import OutOfCapaticyModal from "../../components/OutOfCapaticyModal";
import { db } from "../../firebase/firebase";
import { generateId } from "../../functions/idGenerator";
import { generateLogoText } from "../../functions/LogoText";
import { getTime } from "../../functions/Time";

const { Option } = Select;

const CreateProject = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const handleSubmit = async (values) => {
    let docId = "";
    let org = {};
    dispatch(SetGlobalLoading(true));
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

    if (org.projects.length > 2) {
      setVisible(true);
      dispatch(SetGlobalLoading(false));
    } else {
      const project_data = {
        project_name: values.name,
        project_id: generateId(values.name),
        project_logoText: generateLogoText(values.name),
        project_avatar: null,
        tabs: [],
        org_serverId: docId,
        createdOn: getTime("m/d/y"),
      };

      await updateDoc(doc(db, "organizations", docId), {
        projects: arrayUnion({
          ...project_data,
        }),
      });
      dispatch(SetGlobalLoading(false));
      form.resetFields();
      navigate(
        `/w/p/overview?orgId=${generateId(values.selected_org)}&projectId=${
          project_data.project_id
        }`
      );
    }
  };

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
      <OutOfCapaticyModal
        type="projects"
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default CreateProject;
