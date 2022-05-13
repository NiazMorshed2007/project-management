import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../../layout/Layout";
import Main from "../../layout/Main";
import CreateHeader from "./CreateHeader";
import CreateOrganization from "./CreateOrganization";
import CreateProject from "./CreateProject";

const Create = () => {
  return (
    <Layout>
      <CreateHeader />
      <Main>
        <div className=" flex h-screen justify-center flex-col px-32 w-full">
          <Routes>
            <Route path={"organization"} element={<CreateOrganization />} />
            <Route path={"project/:id"} element={<CreateProject />} />
          </Routes>
        </div>
      </Main>
    </Layout>
  );
};

export default Create;
