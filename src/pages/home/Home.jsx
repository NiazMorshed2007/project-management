import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import Main from "../../layout/Main";
import TaskPage from "../taskpage/TaskPage";
import HeaderHome from "./HeaderHome";
import HomeOverview from "./HomeOverview";

const Home = () => {
  const { id } = useParams();
  return (
    <Layout>
      <HeaderHome id={id} />
      <Main>
        {id === "overview" && <HomeOverview />}
        {id === "my_tasks" && <TaskPage />}
      </Main>
    </Layout>
  );
};

export default Home;
