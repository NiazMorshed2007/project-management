import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/u/:id" element={<Home />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
