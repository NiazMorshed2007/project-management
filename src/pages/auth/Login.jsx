import React from "react";

const Login = () => {
  const handleLogin = () => {};
  return (
    <>
      <h1 className=" mt-11 text-3xl font-semibold">Log in to Quire</h1>
      <p className="mt-2 text-secondary text-lg">Welcome Back!</p>
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
        </form>
      </div>
    </>
  );
};

export default Login;
