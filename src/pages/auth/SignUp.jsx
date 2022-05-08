import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {};
  return (
    <>
      <h1>Sign up for Quire</h1>
      <p>Dream. Plan. Achieve.</p>
      <div className="form-wrapper mt-7 w-72">
        <form onSubmit={handleSignUp}>
          <div className="label-inp">
            <input required id="email" type="email" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="label-inp">
            <input required id="password" type="password" />
            <label htmlFor="email">Password</label>
          </div>
          <Button className="w-full mt-5 primary-btn" size="large">
            GET STARTED - It's FREE
          </Button>
        </form>
      </div>
      <div className="option">
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in here</span>{" "}
        </p>
      </div>
    </>
  );
};

export default SignUp;
