import React from "react";
import {
  GIStyles,
  GITitle,
  GIUl,
  GILi,
  GILogo,
  GILogoDiv,
  GIContainer,
} from "../style/GITotalCss";
import { Link } from "react-router-dom";

const Group = () => {
  return (
    <GIContainer>
      <GIStyles>
        <GITitle>Group Selection</GITitle>
        <div>
          <GIUl>
            <GILi><Link to="/main"><img src={`${process.env.PUBLIC_URL}/images/test.png`} /></Link></GILi>
            <GILi><Link to="/main"><img src={`${process.env.PUBLIC_URL}/images/test.png`} /></Link></GILi>
            <GILi><Link to="/main"><img src={`${process.env.PUBLIC_URL}/images/test.png`} /></Link></GILi>
          </GIUl>
        </div>
      </GIStyles>
      <GILogoDiv>
        <GILogo src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
      </GILogoDiv>
    </GIContainer>
  );
};

export default Group;
