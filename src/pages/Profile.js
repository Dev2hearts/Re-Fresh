import React, { useEffect, useState } from "react";
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
// axios 관련
import { getUserAll } from "../api/fetch";

const Profile = () => {
  // state 에는 데이터가 저장되는 장소다.
  // 그런데 지금 , html 을 넣었다.
  // 사용자 정보를 저장하는 state
  /*
   [
      {사용자닉네임, 사용자생일, 사용자사진, 사용자그룹},     
  ]
   */
  const [profiles, setProfiles] = useState([]);

  // 사용자 정보를 axios 로 가지고 옮
  const getAllUserParse = async () => {
    const data = await getUserAll();
    setProfiles(data);
  };
  useEffect(() => {
    // 서버에서 회원 전체 자료 가져오기
    getAllUserParse();
    console.log(getAllUserParse)
  }, []);

  return (
    <GIContainer>
      <GIStyles>
        <GITitle>Account Selection</GITitle>
        <div>
          <GIUl>
            {profiles.map((item, index) => (
              <GILi key={index}>
                {/* 클릭시에 사용자 아이디를 전달한다. */}
                <Link to={`/group/${item.iuser}`}>
                  <img src={`${process.env.PUBLIC_URL}/images/Test.png`} />
                </Link>
              </GILi>
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
