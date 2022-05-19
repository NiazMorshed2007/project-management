import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SetGlobalLoading } from "../../actions";
import { db } from "../../firebase/firebase";
import Layout from "../../layout/Layout";
import Main from "../../layout/Main";
import ProjectHeader from "./ProjectHeader";
import ProjectLists from "./ProjectLists";
import ProjectOverview from "./ProjectOverview";

const Project = () => {
  const { id } = useParams();
  const [org, setOrg] = useState([]);
  const [project, setProject] = useState([]);
  const [project_serverId, setProjectServerId] = useState("");
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isGlobalLoading = useSelector((state) => {
    return state.isGlobalLoading;
  });
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const url_org_id = params.get("orgId");
  const url_project_id = params.get("projectId");
  const renderChain = (Routeid) => {
    switch (Routeid) {
      case "overview":
        return <ProjectOverview org={org} project={project} />;
      default:
        return <ProjectLists tasks={tasks} />;
    }
  };
  useEffect(() => {
    dispatch(SetGlobalLoading(true));
    const q = query(
      collection(db, "projects"),
      where("owner_id", "==", userProfile.uid),
      where("parent_org_id", "==", url_org_id),
      where("project_id", "==", url_project_id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const e_project = [];
      querySnapshot.forEach((doc) => {
        e_project.push(doc.data());
        setProjectServerId(doc.id);
      });
      dispatch(SetGlobalLoading(false));
      e_project.length < 1 ? navigate("/error") : setProject(...e_project);
    });
  }, []);
  useEffect(() => {
    const filteredrg = userProfile.organizations.find((org) => {
      return org.org_id === url_org_id;
    });
    setOrg(filteredrg);
  }, [url_org_id]);
  useEffect(() => {
    if (project && project.tabs) {
      const tabs = [];
      tabs.push(...project.tabs);
      switch (id) {
        case "lists":
          {
            const all_tasks = [];
            tabs.map((tab) => {
              all_tasks.push(tab.tasks);
            });
            setTasks(...all_tasks);
          }
          break;
        default:
          {
            setTasks([]);
          }
          break;
      }
    }
    // console.log(project.tabs);
  }, [id, project]);
  return (
    <Layout>
      <ProjectHeader
        serverId={project_serverId}
        org={org}
        tabId={id}
        project={project && project}
      />
      <Main>{renderChain(id)}</Main>
    </Layout>
  );
};

export default Project;
