import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SetGlobalLoading } from "../../actions";
import { db } from "../../firebase/firebase";
import Layout from "../../layout/Layout";
import Main from "../../layout/Main";
import TaskPage from "../taskpage/TaskPage";
import ProjectHeader from "./ProjectHeader";
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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [org]);
  useEffect(() => {
    if (project && project.tasks) {
      if (id === "lists") {
        setTasks(project.tasks);
      } else {
        const filtered_tasks = project.tasks.filter((task) => {
          return task.task_tabId === id;
        });
        setTasks(filtered_tasks);
      }
    }
    // eslint-disable-next-line
  }, [id, project]);
  return (
    <Layout>
      <ProjectHeader
        projectIndex={projectIndex}
        org={org}
        tabId={id}
        project={project && project}
      />
      <Main Notpadding={true}>
        {id === "overview" ? (
          <ProjectOverview org={org} project={project} />
        ) : (
          <TaskPage tabId={id} org={org} project={project} tasks={tasks} />
        )}
      </Main>
    </Layout>
  );
};

export default Project;
