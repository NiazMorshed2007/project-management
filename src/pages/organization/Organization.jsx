import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SetGlobalLoading } from "../../actions";
import { db } from "../../firebase/firebase";
import Layout from "../../layout/Layout";
import Main from "../../layout/Main";
import OrgHeader from "./OrgHeader";
import OrgOverview from "./OrgOverview";

const Organization = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [org, setOrg] = useState({});
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const params = new URLSearchParams(location.search);
  const url_org_id = params.get("orgId");
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
  return (
    <Layout>
      <OrgHeader org={org} id={id} />
      <Main>
        <OrgOverview current_orgId={url_org_id} org={org} />
      </Main>
    </Layout>
  );
};

export default Organization;
