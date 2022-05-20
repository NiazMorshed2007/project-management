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
  const [projectIndex, setProjectIndex] = useState(0);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      collection(db, "organizations"),
      where("owner_id", "==", userProfile.uid),
      where("org_id", "==", url_org_id)
    );
    onSnapshot(q, (querySnapshot) => {
      const e_org = [];
      querySnapshot.forEach((doc) => {
        e_org.push(doc.data());
      });
      dispatch(SetGlobalLoading(false));
      e_org.length < 1 ? navigate("/error") : setOrg(...e_org);
    });
  }, [url_org_id]);
  useEffect(() => {
    if (org && org.projects) {
      const projects = org.projects;
      const thisProject = projects.find(({ project_id }) => {
        return project_id === url_project_id;
      });
      const index = projects.findIndex(({ project_id }) => {
        return project_id === url_project_id;
      });
      setProjectIndex(index);
      setProject(thisProject);
    }
  }, [org]);
  // useEffect(() => {
  //   if (project && project.tabs) {
  //     const tabs = [];
  //     tabs.push(...project.tabs);
  //     switch (id) {
  //       case "lists":
  //         {
  //           const all_tasks = [];
  //           tabs.map((tab) => {
  //             all_tasks.push(tab.tasks);
  //           });
  //           setTasks(...all_tasks);
  //         }
  //         break;
  //       default:
  //         {
  //           setTasks([]);
  //         }
  //         break;
  //     }
  //   }
  //   // console.log(project.tabs);
  // }, [id, project]);
  return (
    <Layout>
      <ProjectHeader
        projectIndex={projectIndex}
        org={org}
        tabId={id}
        project={project && project}
      />
      <Main>{renderChain(id)}</Main>
    </Layout>
  );
};

export default Project;
