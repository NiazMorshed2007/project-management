import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const AuthHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="flex sticky top-0 w-full items-center justify-between">
      <Logo w={90} h={40} />
      <nav className="flex gap-7">
        <Button
          onClick={() => navigate("/login")}
          className=" hovPrimary-btn"
          size="large"
        >
          Login
        </Button>
        <Button
          onClick={() => navigate("/signup")}
          className="primary-btn"
          size="large"
        >
          Sign up for free
        </Button>
      </nav>
    </header>
  );
};

export default AuthHeader;
