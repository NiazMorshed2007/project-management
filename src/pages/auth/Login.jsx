import { Button } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const isGlobalLoading = useSelector((state) => {
    return state.isGlobalLoading;
  });
  const handleLogin = () => {};
  useEffect(() => {
    if (!isGlobalLoading) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <h1>Log in to Quire</h1>
      <p>Welcome Back!</p>
      <div className="form-wrapper mt-7 w-72">
        <form onSubmit={handleLogin}>
          <div className="label-inp">
            <input required={true} id="email" type="text" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="label-inp">
            <input required id="password" type="password" />
            <label htmlFor="email">Password</label>
          </div>
          <Button
            htmlType="submit"
            className="w-full mt-5 primary-btn"
            size="large"
          >
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
