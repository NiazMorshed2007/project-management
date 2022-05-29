import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import Main from "../../layout/Main";
import TaskPage from "../taskpage/TaskPage";
import HeaderHome from "./HeaderHome";
import HomeOverview from "./HomeOverview";

const Home = () => {
  const { id } = useParams();
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  return (
    <Layout>
      <HeaderHome id={id} />
      <Main>
        {id === "overview" && <HomeOverview />}
        {id === "my_tasks" && <TaskPage tasks={userProfile.my_tasks} />}
      </Main>
    </Layout>
  );
};

export default Home;
