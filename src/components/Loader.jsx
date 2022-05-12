import React from "react";

const Loader = () => {
  return (
    <div className="loader-mask z-40 bg-white/90 backdrop-blur-sm top-0 fixed w-screen h-screen flex items-center justify-center">
      <div className="loader w-14 h-14 rounded-full border border-t-transparent border-brand animate-spin"></div>
    </div>
  );
};

export default Loader;
