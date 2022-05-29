import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "../pages/create/Create";
// import Error from "../pages/Error";
import Home from "../pages/home/Home";
import Organization from "../pages/organization/Organization";
import Project from "../pages/project/Project";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/u/:id*" element={<Home />} />
        <Route path="/c/*" element={<Create />} />
        <Route path="/w/o/:id" element={<Organization />} />
        <Route path="/w/p/:id/*" element={<Project />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </>
  );
};

export default PrivateRoutes;
