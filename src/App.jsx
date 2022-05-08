import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";
import AllRoutes from "./routes/AllRoutes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SetGlobalLoading } from "./actions";
import firebase from "./firebase/firebase";

const App = () => {
  const auth = firebase && getAuth();
  const dispatch = useDispatch();
  const isGlobalLoading = useSelector((state) => {
    return state.isGlobalLoading;
  });
  useEffect(() => {
    dispatch(SetGlobalLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        console.log("signed out");
      }
    });
    dispatch(SetGlobalLoading(false));
  }, []);
  return (
    <>
      {isGlobalLoading && <Loader />}
      <AllRoutes />
    </>
  );
};

export default App;
