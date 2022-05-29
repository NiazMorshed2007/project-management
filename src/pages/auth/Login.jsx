import { Button } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogged } from "../../actions";
import { auth } from "../../firebase/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;
  const isGlobalLoading = useSelector((state) => {
    return state.isGlobalLoading;
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((usr_) => {
        dispatch(setLogged(true));
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
        setError(errMsg);
      });
  };
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
        {error !== "" && (
          <div className="err-wrapper p-4 rounded-lg bg-red-200 mb-10">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="label-inp">
            <input
              name="email"
              onChange={handleChange}
              required
              id="email"
              type="text"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="label-inp">
            <input
              name="password"
              onChange={handleChange}
              required
              id="password"
              type="password"
            />
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
