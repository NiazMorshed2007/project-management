import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BaseInfo from "../../components/BaseInfo";
import Layout from "../../layout/Layout";
import HeaderHome from "./HeaderHome";

const Home = () => {
  const { id } = useParams();
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const memoId = useMemo(() => id, []);
  return (
    <Layout>
      <HeaderHome id={memoId} />
      <main className="p-7">
        <BaseInfo
          avatr={
            <>
              {userProfile.avatar !== null ? (
                <img src={userProfile.avatar} alt="avatar" />
              ) : (
                <h1 className="font-semibold text-white text-2xl">
                  {userProfile.logoText}
                </h1>
              )}
            </>
          }
        />
      </main>
    </Layout>
  );
};

export default Home;
