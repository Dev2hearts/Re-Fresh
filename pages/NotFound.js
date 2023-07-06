import React from "react";
import { IntroWrap } from "../style/IntroCss";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/intro");
  };
  return (
    <IntroWrap onClick={handleClick}>
      <div className="text-center text-xl">
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="로고" />
        <p>페이지가 없습니다!</p>
      </div>
    </IntroWrap>
  );
};

export default NotFound;
