import {
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Radio,
  Select,
} from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BiMessageRounded, BiUser } from "react-icons/bi";
import {
  BsBuilding,
  BsCircle,
  BsFullscreen,
  BsPencil,
  BsTags,
  BsTrash,
} from "react-icons/bs";
import { FiBook, FiChevronDown, FiEye, FiSettings } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiAddCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SetGlobalLoading } from "../../actions";
import CustomTabs from "../../components/CustomTabs";
import DeleteModal from "../../components/DeleteModal";
import OutOfCapaticyModal from "../../components/OutOfCapaticyModal";
import { db } from "../../firebase/firebase";
import { iconsArr } from "../../functions/icons.arr";
import { generateId } from "../../functions/idGenerator";
import Header from "../../layout/Header";

const { Option } = Select;

const ProjectHeader = (props) => {
  const { project, org, projectIndex, tabId } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteVisible, setDeleteVisisble] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const location_params = location.search;
  const [tabs, setTabs] = useState([]);
  const [activeIconIndex, setActiveiconIndex] = useState(0);
  const showAddModal = () => {
    // tabs.length > 4 ? setWarning(true) :
    setAddModal(true);
  };
  const closeAddModal = () => {
    setAddModal(false);
    form.resetFields();
  };

  // deleting functions
  const handleDeleteProject = () => {
    org.projects.splice(projectIndex, 1);
    console.log(org.projects);
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
    navigate(`/w/o/overview?orgId=${org.org_id}`);
  };

  // adding functions
  const handleAddSublist = (values) => {
    dispatch(SetGlobalLoading(true));
    const tab_data = {
      name: values.name,
      id: generateId(values.name),
      iconIndex: activeIconIndex,
      defaultView: values.default_view,
      link: `/w/p/${generateId(values.name)}/${values.default_view}`,
      type: "sublist",
    };
    org.projects[projectIndex].tabs.push({ ...tab_data });
    updateDoc(doc(db, "organizations", project.org_serverId), {
      projects: org.projects,
    });
    navigate(`${tab_data.link}${location_params}`);
    dispatch(SetGlobalLoading(false));
    closeAddModal();
    form.resetFields();
  };
  useEffect(() => {
    if (project && project.tabs) {
      setTabs([
        {
          name: "Lists",
          id: "lists",
          link: `/w/p/lists/tree`,
        },
        {
          name: "Overview",
          id: "overview",
          link: `/w/p/overview`,
        },
        ...project.tabs,
      ]);
    }
  }, [project]);
  return (
    <Header
      head={
        project && (
          <>
            <div className="flex items-center gap-1">
              <p className="m-0">{project.project_name}</p>
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu
                    items={[
                      {
                        label: `Go to ${org.org_name}`,
                        key: "org_name",
                        icon: <BsBuilding />,
                        onClick: () => {
                          navigate(`/w/o/overview?orgId=${org.org_id}`);
                        },
                      },
                      {
                        label: (
                          <>
                            <p className="m-0">
                              Go to other projects... <kbd>Ctrl</kbd>+
                              <kbd>B</kbd>
                            </p>
                          </>
                        ),
                        key: "navig_other",
                        icon: <FiBook />,
                      },
                      {
                        type: "divider",
                      },
                      {
                        label: "Edit Name and Description",
                        key: "edit_name&des",
                        icon: <BsPencil />,
                      },
                      {
                        label: "Edit members",
                        key: "edit_member",
                        icon: <BiUser />,
                      },
                      {
                        label: "Edit statuses",
                        key: "edit_statuses",
                        icon: <BsCircle />,
                      },
                      {
                        label: "Edit tags",
                        key: "edit_tags",
                        icon: <BsTags />,
                      },
                      {
                        type: "divider",
                      },
                      {
                        label: (
                          <div className="flex items-center justify-between">
                            <p className="m-0">Enter full screen</p>
                            <div>
                              <kbd>Ctrl</kbd>+<kbd>.</kbd>
                            </div>
                          </div>
                        ),
                        icon: <BsFullscreen />,
                        key: "full_screen",
                      },
                      {
                        type: "divider",
                      },
                      {
                        label: "Follow",
                        key: "follow",
                        icon: <FiEye />,
                      },
                      {
                        label: "Comment",
                        key: "comment",
                        icon: <BiMessageRounded />,
                      },
                      {
                        type: "divider",
                      },
                      {
                        label: "Delete",
                        key: "delete",
                        icon: <BsTrash />,
                        onClick: () => {
                          setDeleteVisisble(true);
                        },
                      },
                      {
                        label: "Options",
                        key: "options",
                        icon: <FiSettings />,
                      },
                    ]}
                  />
                }
              >
                <i>
                  <FiChevronDown />
                </i>
              </Dropdown>
            </div>
          </>
        )
      }
    >
      <CustomTabs
        project={project}
        org={org}
        addingOption={
          <>
            <div className=" flex items-center gap-1">
              <div
                style={{ width: "1px", height: "20px" }}
                className="line bg-gray-300 mr-3"
              ></div>
              <div
                onClick={showAddModal}
                className={`flex items-center add-sublist cursor-pointer ${
                  project &&
                  project.tabs &&
                  project.tabs.length < 1 &&
                  "show-text"
                }`}
              >
                <RiAddCircleFill className="text-md text-gray-500" />
                <p>Add sublist</p>
              </div>
            </div>
          </>
        }
        defaultActiveTabId={tabId}
        tabs={tabs}
      />

      <Modal
        closeIcon={<></>}
        className="add-sublist-modal"
        footer={false}
        visible={addModal}
        onCancel={closeAddModal}
      >
        <h2 className=" text-2xl">Create Sublist</h2>
        {/* <i>{iconsArr[0]}</i> */}
        <Form
          form={form}
          layout={"inline"}
          requiredMark={false}
          onFinish={handleAddSublist}
        >
          <div>
            <span className="text-[14px] text-slate-800 font-semibold">
              Name
            </span>
            <Form.Item
              label={""}
              name={"name"}
              rules={[
                { required: true, message: "Please input your Sublist Name!" },
              ]}
            >
              <Input
                style={{
                  padding: "0px",
                }}
                addonBefore={
                  <Dropdown
                    placement="bottom"
                    trigger={["click"]}
                    overlay={
                      <div className="bg-white mt-2 p-2 max-w-[170px] rounded-lg shadow-xl border">
                        <div className="flex items-center gap-2 flex-wrap">
                          {iconsArr.map((icon, i) => (
                            <i
                              onClick={() => {
                                setActiveiconIndex(i);
                              }}
                              className={`w-6 ${
                                i === activeIconIndex && "border-brand"
                              } h-6 text-sm hover:border-brand transition-all border-transparent cursor-pointer border flex items-center justify-center rounded-md`}
                              key={i}
                            >
                              {icon}
                            </i>
                          ))}
                        </div>
                      </div>
                    }
                  >
                    <div className="flex items-center gap-1 cursor-pointer">
                      <i>{iconsArr[activeIconIndex]}</i>
                      <IoMdArrowDropdown />
                    </div>
                  </Dropdown>
                }
                placeholder="Sublist name"
              />
            </Form.Item>
          </div>
          {/* <div> */}
          {/* <span>Share with</span> */}
          <div>
            <span className="text-[14px] text-slate-800 font-semibold">
              Share with
            </span>
            <Form.Item
              className="w-[240px]"
              name="share_with"
              rules={[{ required: true, message: "Please select a type!" }]}
            >
              <Select className="w-[290px]" placeholder="Share with">
                <Option value="project_members">Project Memebers</Option>
                <Option value="only_me">Only me</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="mt-4">
            <span className="text-[14px] text-slate-800 font-semibold">
              Deafult View
            </span>
            <Form.Item
              rules={[{ required: true, message: "Select a view" }]}
              name="default_view"
              label=""
            >
              <Radio.Group>
                <Radio value="tree">Tree</Radio>
                <Radio value="board">Board</Radio>
                <Radio value="timeline">Timeline</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          {/* </div> */}
        </Form>
        <div className="flex mt-5 items-center justify-end gap-3">
          <Button
            onClick={() => {
              form.submit();
            }}
            htmlType="submit"
            className=" primary-btn-pdsm"
          >
            Create
          </Button>
          <Button
            onClick={closeAddModal}
            htmlType="cancel"
            className="default-btn-unfilled"
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <OutOfCapaticyModal
        visible={warning}
        setVisible={setWarning}
        type={"tabs"}
      />
      <DeleteModal
        visible={deleteVisible}
        setVisible={setDeleteVisisble}
        onOk={handleDeleteProject}
        name={project && project.project_name}
        type={"Project"}
      />
    </Header>
  );
};

export default ProjectHeader;
