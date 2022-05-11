import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../../layout/Layout";
import Main from "../../layout/Main";
import CreateHeader from "./CreateHeader";
import CreateOrganization from "./CreateOrganization";

const Create = () => {
  return (
    <Layout>
      <CreateHeader />
      <Main>
        <Routes>
          <Route path={"organization"} element={<CreateOrganization />} />
        </Routes>
      </Main>
    </Layout>
  );
};

export default Create;
