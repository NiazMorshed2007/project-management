import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import HeaderHome from "./HeaderHome";
import HomeOverview from "./Overview";

const Home = () => {
  const { id } = useParams();
  const memoId = useMemo(() => id, []);
  return (
    <Layout>
      <HeaderHome id={memoId} />
      <main className="p-7 pr-72 px-48">
        {id === "overview" && <HomeOverview />}
      </main>
    </Layout>
  );
};

export default Home;
