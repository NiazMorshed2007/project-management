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
import { auth, db } from "../../firebase/firebase";
import {
  SetGlobalLoading,
  setLogged,
  setUserProfile,
} from "../../actions/index";
import { doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { generateLogoText } from "../../functions/LogoText";
import { getTime } from "../../functions/Time";
import { generateId } from "../../functions/idGenerator";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = data;
  const [showPass, setShowPass] = useState("");
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(SetGlobalLoading(true));
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch(setLogged(true));
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(async () => {
            await setDoc(doc(db, "users", user.uid), {
              displayName: user.displayName,
              name,
              email,
              logoText: generateLogoText(name),
              avatar: user.photoURL,
              organizations: [
                {
                  org_name: name + "'s Organization",
                  org_id: generateId(name + "'s Organization"),
                  org_logo: null,
                  org_logoText: generateLogoText(name + "'s Organization"),
                },
              ],
              joinedAt: getTime("m/d/y"),
            })
              .then(() => {
                navigate("/u/overview");
                SetGlobalLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
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
              onChange={handleChange}
              required
              id="email"
              name="email"
              type="text"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="label-inp">
            <input
              value={name}
              onChange={handleChange}
              required
              name="name"
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
              onChange={handleChange}
              name="password"
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
