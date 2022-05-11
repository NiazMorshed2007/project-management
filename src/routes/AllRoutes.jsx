import React from "react";
import { useSelector } from "react-redux";
import Auth from "../pages/auth/Auth";
import PrivateRoutes from "./PrivateRoutes";

const AllRoutes = () => {
  const isGlobalLoading = useSelector((state) => {
    return state.isGlobalLoading;
  });
  const isLogged = useSelector((state) => {
    return state.isLogged;
  });
  return (
    <>{!isGlobalLoading && <>{isLogged ? <PrivateRoutes /> : <Auth />}</>}</>
  );
};

export default AllRoutes;
