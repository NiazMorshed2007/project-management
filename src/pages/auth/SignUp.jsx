import { Button, Tooltip } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { SetGlobalLoading, setLogged } from "../../actions/index";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState("");
  const [name, setName] = useState();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(SetGlobalLoading(true));
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch(setLogged(true));
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            SetGlobalLoading(false);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <>
      <h1>Sign up for Quire</h1>
      <p>Dream. Plan. Achieve.</p>
      <div className="form-wrapper mt-7 w-72">
        <form onSubmit={handleSignUp}>
          <div className="label-inp">
            <input
              value={email}
              onChange={handleEmail}
              required
              id="email"
              type="text"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="label-inp">
            <input
              value={name}
              onChange={handleName}
              required
              id="name"
              type="text"
            />
            <label htmlFor="name">Name</label>
            <Tooltip title="Your name is publicly visible">
              <i>
                <AiOutlineInfoCircle />
              </i>
            </Tooltip>
          </div>
          <div className="label-inp">
            <input
              value={password}
              onChange={handlePass}
              required
              id="password"
              type={showPass ? "text" : "password"}
            />
            <label htmlFor="email">Password</label>
            <Tooltip title={"Show Password"}>
              <i
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </i>
            </Tooltip>
          </div>
          <Button
            htmlType="submit"
            className="w-full mt-5 primary-btn"
            size="large"
          >
            I'm done, let's go!
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
