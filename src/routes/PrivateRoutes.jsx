import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "../pages/create/Create";
import Home from "../pages/home/Home";
import Organization from "../pages/organization/Organization";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/u/:id" element={<Home />} />
        <Route path="/c/*" element={<Create />} />
        <Route path="/w/o/:id" element={<Organization />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
