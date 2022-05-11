import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "../pages/create/Create";
import Home from "../pages/home/Home";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/u/:id" element={<Home />} />
        <Route path="/c/*" element={<Create />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
