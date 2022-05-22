import React from "react";

const Main = ({ children }) => {
  return (
    <main
      style={{
        padding: "0 15%",
      }}
      className="p-7 relative"
    >
      {children}
    </main>
  );
};

export default Main;
