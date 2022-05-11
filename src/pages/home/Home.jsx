import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import Main from "../../layout/Main";
import TaskPage from "../taskpage/TaskPage";
import HeaderHome from "./HeaderHome";
import HomeOverview from "./Overview";

const Home = () => {
  const { id } = useParams();
  const memoId = useMemo(() => id, []);
  return (
    <Layout>
      <HeaderHome id={memoId} />
      <Main>
        {id === "overview" && <HomeOverview />}
        {id === "my_tasks" && <TaskPage />}
      </Main>
    </Layout>
  );
};

export default Home;
