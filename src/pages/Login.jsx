import React from "react";
import AuthHeader from "../components/AuthHeader";

const Login = () => {
  return (
    <main className="auth p-5 pr-11">
      <AuthHeader />
      <section className="flex flex-col py-24 items-center justify-center">
        <h1 className=" mt-11 text-3xl font-semibold">Log in to Quire</h1>
        <p className="mt-2 text-secondary text-lg">Welcome Back!</p>
      </section>
    </main>
  );
};

export default Login;
