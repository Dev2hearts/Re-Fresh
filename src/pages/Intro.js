import React from "react";
import logo from "../image/Logo.png";
import { IntroWrap } from "../style/IntroCss";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };
  return (
    <IntroWrap onClick={handleClick}>
      <img src={logo} alt="로고" />
    </IntroWrap>
  );
};

export default Intro;
