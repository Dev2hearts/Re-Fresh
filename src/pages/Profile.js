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

const Profile = () => {
  // state 에는 데이터가 저장되는 장소다.
  // 그런데 지금 , html 을 넣었다.
  // 사용자 정보를 저장하는 state
  /*
   [
      {사용자닉네임, 사용자생일, 사용자성별, 사용자사진, 사용자그룹},     
  ]
   */
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // 서버에서 자료 가져오기
    const sampleUser = [
      {
        userPk: 1,
        nickName: "홍길동1",
        birthDay: "2023-06-20",
        gender: "남",
        pic: "image.jpg",
        group: "01",
      },
      {
        userPk: 2,
        nickName: "홍길동2",
        birthDay: "2023-06-20",
        gender: "남",
        pic: "image.jpg",
        group: "02",
      },
      {
        userPk: 3,
        nickName: "홍길동3",
        birthDay: "2023-06-20",
        gender: "남",
        pic: "image.jpg",
        group: "03",
      },
      {
        userPk: 4,
        nickName: "홍길동4",
        birthDay: "2023-06-20",
        gender: "남",
        pic: "image.jpg",
        group: "04",
      },
      {
        userPk: 5,
        nickName: "홍길동5",
        birthDay: "2023-06-20",
        gender: "남",
        pic: "image.jpg",
        group: "05",
      },
      {
        userPk: 6,
        nickName: "홍길동6",
        birthDay: "2023-06-20",
        gender: "남",
        pic: "image.jpg",
        group: "06",
      },
    ];
    setProfiles(sampleUser);
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
                <Link to={`/group/${item.userPk}`}>
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
