import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SetGlobalLoading, setLogged, setUserProfile } from "./actions";
import Loader from "./components/Loader";
import { auth, db } from "./firebase/firebase";
import AllRoutes from "./routes/AllRoutes";

const App = () => {
  const dispatch = useDispatch();
  const [uid, setUid] = useState("");
  const isGlobalLoading = useSelector((state) => {
    return state.isGlobalLoading;
  });
  const isLogged = useSelector((state) => {
    return state.isLogged;
  });
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/u/overview");
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    let uid = "";
    dispatch(SetGlobalLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        dispatch(setLogged(true));
        setUid(user.uid);
        dispatch(SetGlobalLoading(false));
      } else {
        console.log("signed out");
        dispatch(setLogged(false));
        dispatch(SetGlobalLoading(false));
      }
    });
  }, []);
  useEffect(() => {
    console.log(uid);
    if (uid !== "" && isLogged) {
      onSnapshot(doc(db, "users", uid), (doc) => {
        const data = doc.data();
        dispatch(setUserProfile(data));
      });
    }
  }, [uid]);
  return (
    <>
      {isGlobalLoading && <Loader />}
      <AllRoutes />
    </>
  );
};

export default App;
