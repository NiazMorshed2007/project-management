import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SetGlobalLoading, setLogged, setUserProfile } from "./actions";
import Loader from "./components/Loader";
import { auth } from "./firebase/firebase";
import AllRoutes from "./routes/AllRoutes";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isGlobalLoading = useSelector((state) => {
    return state.isGlobalLoading;
  });
  useEffect(() => {
    dispatch(SetGlobalLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(setLogged(true));
        dispatch(
          setUserProfile({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
          })
        );
        dispatch(SetGlobalLoading(false));
      } else {
        console.log("signed out");
        dispatch(setLogged(false));
        dispatch(SetGlobalLoading(false));
      }
    });
  }, []);
  return (
    <>
      {isGlobalLoading && <Loader />}
      <AllRoutes />
    </>
  );
};

export default App;
