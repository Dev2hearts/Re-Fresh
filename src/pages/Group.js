import React, { useEffect, useState } from "react";
import {
  GIStyles,
  GITitle,
  GIUl,
  GIDiv,
  GILi,
  GILogo,
  GILogoDiv,
  GIContainer,
} from "../style/GITotalCss";
import { Link, useParams } from "react-router-dom";
import { getGroupAll } from "../api/fetch";

const Group = ({ setAppGroups }) => {
  const params = useParams();
  const userPK = parseInt(params.iuser);
  const [groupList, setGroupList] = useState([]);

  const getAllGroupParse = () => {
    getGroupAll().then(data => {
      setGroupList(data);
    });
  };

  useEffect(() => {
    getAllGroupParse();
  }, [userPK]);
  const getAllUserParse = async () => {
    const data = await getGroupAll();
    // App.js 에 사용자 정보 모두 저장
    setAppGroups(data);
  };
  useEffect(() => {
    // 서버에서 회원 전체 자료 가져오기
    getAllUserParse();
  }, []);

  return (
    <GIContainer>
      <GIStyles>
        <GITitle>Group Selection</GITitle>
        <div>
          <GIUl>
            {groupList.map((item, index) => {
              if (item.iuser === userPK) {
                return (
                  <GILi key={index}>
                    <GIDiv>
                      <Link to={`/main/${item.iuser}/${item.igroup}`}>
                        <img
                          src={`/img/${item.pic}`}
                        />
                      </Link>
                    </GIDiv>
                    <span>{item.gnm}</span>
                  </GILi>
                );
              } else {
                return null;
              }
            })}
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
