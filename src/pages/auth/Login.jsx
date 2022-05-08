import { Button } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {};
  useEffect(() => {
    navigate("/login");
  }, []);
  return (
    <>
      <h1>Log in to Quire</h1>
      <p>Welcome Back!</p>
      <div className="form-wrapper mt-7 w-72">
        <form onSubmit={handleLogin}>
          <div className="label-inp">
            <input required id="email" type="email" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="label-inp">
            <input required id="password" type="password" />
            <label htmlFor="email">Password</label>
          </div>
          <Button className="w-full mt-5 primary-btn" size="large">
            Login
          </Button>
        </form>
      </div>
      <div className="option">
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up here</span>{" "}
        </p>
      </div>
    </>
  );
};

export default Login;
