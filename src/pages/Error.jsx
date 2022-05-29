import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/error");
  });
  return <div>404 - Error Page</div>;
};

export default Error;
