import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = () => {
  return (
    <main className="auth p-5 pr-11">
      <AuthHeader />
      <section className="flex flex-col py-24 items-center justify-center">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </section>
    </main>
  );
};

export default Auth;
