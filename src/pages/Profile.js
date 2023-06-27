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
import companyLogo from "../image/Logo.png";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <GIContainer>
      <GIStyles>
        <GITitle>Account Selection</GITitle>
        <div>
          <GIUl>
            <GILi><Link to="/group">임시</Link></GILi>
            <GILi><Link to="/group">임시</Link></GILi>
            <GILi><Link to="/group">임시</Link></GILi>
            <GILi><Link to="/group">임시</Link></GILi>
            <GILi><Link to="/group">임시</Link></GILi>
            <GILi><Link to="/group">임시</Link></GILi>
          </GIUl>
        </div>
      </GIStyles>
      <GILogoDiv>
        <GILogo src={companyLogo} alt="logo" />
      </GILogoDiv>
    </GIContainer>
  );
};

export default Profile;
