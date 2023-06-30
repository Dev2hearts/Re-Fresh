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
import { Link, useParams } from "react-router-dom";

const Group = () => {
  // 주소창에 전달된 사용자 PK 를 참조한다.
  const params = useParams();
  const userPK = params.iuser;
  // console.log(userPK);
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    // 서버자료 요청 : 사용자가 소속된 그룹 목록을 사용자 Primary Key로 알아낸다.
    const userGroups = [1, 2, 3, 4];
    setGroupList(userGroups);
  }, []);

  return (
    <GIContainer>
      <GIStyles>
        <GITitle>Group Selection</GITitle>
        <div>
          <GIUl>
            {groupList.map((item, index) => (
              <GILi key={index}>
                {/* 클릭시에 사용자 아이디를 전달한다. */}
                <Link to={`/main`}>
                  <img src={`${process.env.PUBLIC_URL}/images/Test.png`} />
                </Link>
              </GILi>
            ))}
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
