import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
};

export default Layout;
