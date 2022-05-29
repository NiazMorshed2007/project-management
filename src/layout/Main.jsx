import React from "react";

const Main = (props) => {
  const { children } = props;
  return (
    <main className="relative h-screen">
      <div className="mt-2">
        <div
          style={{
            paddingRight: "13%",
            paddingLeft: "13%",
            height: "calc(100vh - 120px)",
          }}
          className="inner mt-5 pb-10 overflow-y-scroll"
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default Main;
