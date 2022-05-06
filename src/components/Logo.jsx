import React from "react";
import logo from "../assets/logo.png";

const Logo = (props) => {
  const { w, h } = props;
  return (
    <div>
      <img width={w} h={h} src={logo} alt="" />
    </div>
  );
};

export default Logo;
