import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { SetGlobalLoading } from "../../actions";
import { db } from "../../firebase/firebase";
import Layout from "../../layout/Layout";
import Main from "../../layout/Main";
import ProjectHeader from "./ProjectHeader";
import ProjectLists from "./ProjectLists";
import ProjectOverview from "./ProjectOverview";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
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
        return <ProjectOverview project={project} />;
      default:
        return <ProjectLists />;
    }
  };
  useEffect(() => {
    const e_project = [];
    const q = query(
      collection(db, "projects"),
      where("owner_id", "==", userProfile.uid),
      where("parent_org_id", "==", url_org_id),
      where("project_id", "==", url_project_id)
    );
    const getData = async () => {
      dispatch(SetGlobalLoading(true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        e_project.push(doc.data());
      });
      dispatch(SetGlobalLoading(false));
      e_project.length < 1 ? navigate("/error") : setProject(...e_project);
    };
    getData();
  }, [url_org_id, url_project_id]);
  return (
    <Layout>
      <ProjectHeader tabId={id} project={project && project} />
      <Main>{renderChain(id)}</Main>
    </Layout>
  );
};

export default Project;
