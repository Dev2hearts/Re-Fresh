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
import TestImage from "../image/Test.png"

const Group = () => {
  return (
    <GIContainer>
      <GIStyles>
        <GITitle>Group Selection</GITitle>
        <div>
          <GIUl>
            <GILi><Link to="/main"><img src={TestImage} /></Link></GILi>
            <GILi><Link to="/main"><img src={TestImage} /></Link></GILi>
            <GILi><Link to="/main"><img src={TestImage} /></Link></GILi>
            <GILi>
              <Link to="/main">임시</Link>
            </GILi>
            <GILi>
              <Link to="/main">임시</Link>
            </GILi>
            <GILi>
              <Link to="/main">임시</Link>
            </GILi>
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
