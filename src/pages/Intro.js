import React from "react";
import { IntroWrap } from "../style/IntroCss";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };
  return (
    <>
      <IntroWrap onClick={handleClick}>
        <img src={`${process.env.PUBLIC_URL}/images/Logo.png`} alt="logo" />
      </IntroWrap>
    </>
  );
};

export default Intro;
