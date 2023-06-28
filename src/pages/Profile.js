import React, { useState } from "react";
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

const Profile = () => {
  const [profiles, setProfiles] = useState([
    <GILi key={0}>
      <Link to="/group">
        <img src={`${process.env.PUBLIC_URL}/images/Test.png`} />
      </Link>
    </GILi>,
    <GILi key={1}>
      <Link to="/group">
        <img src={`${process.env.PUBLIC_URL}/images/Test.png`} />
      </Link>
    </GILi>,
    <GILi key={2}>
      <Link to="/group">
        <img src={`${process.env.PUBLIC_URL}/images/Test.png`} />
      </Link>
    </GILi>,
    <GILi key={3}>
      <Link to="/group">
        <img src={`${process.env.PUBLIC_URL}/images/Test.png`} />
      </Link>
    </GILi>,
    <GILi key={4}>
    <Link to="/group">
      <img src={`${process.env.PUBLIC_URL}/images/Test.png`} />
    </Link>
  </GILi>,
  ]);

  return (
    <GIContainer>
      <GIStyles>
        <GITitle>Account Selection</GITitle>
        <div>
          <GIUl>
            {profiles.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
          </GIUl>
        </div>
      </GIStyles>
      <GILogoDiv>
        <GILogo src={`${process.env.PUBLIC_URL}/images/Logo.png`} alt="logo" />
      </GILogoDiv>
    </GIContainer>
  );
};

export default Profile;
