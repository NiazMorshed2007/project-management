import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./styles/style.scss";
import App from "./App.jsx";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

store.subscribe(() => {});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  // </React.StrictMode>
);
