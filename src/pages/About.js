import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Header,
  HeaderUser,
  UIDdiv,
  TitleUser,
  BackDiv,
  Imgdiv,
  Title,
  Information,
  SubTitle,
  Userlist,
  UserLi,
  UserImgdiv,
  UserNmBirth,
  Grouplist,
} from "../style/AboutCss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const About = ({ appUsers, appGroups }) => {
  const params = useParams();
  const userSelectPK = parseInt(params.iuser);
  const userGroupSelectPK = parseInt(params.igroup);
  const [user, setUser] = useState({});
  const [groupGnm, setGroupGnm] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const nowUserFind = appUsers.find(
      item => item.iuser === userSelectPK && item.igroup === userGroupSelectPK,
    );
    if (nowUserFind) {
      setUser(nowUserFind);
      setGroupList(appUsers.filter(item => item.igroup === nowUserFind.igroup));
    }
  }, [appUsers, userSelectPK, userGroupSelectPK]);

  useEffect(() => {
    const group = appGroups.find(group => group.igroup === user.igroup);
    if (group) {
      setGroupGnm(group.gnm);
    }
  }, [appGroups, user]);

  useEffect(() => {
    const userGroupList = appUsers
      .filter(item => item.iuser === userSelectPK)
      .map(item => {
        const group = appGroups.find(group => group.igroup === item.igroup);
        return group ? group.gnm : "";
      })
      .sort(); // userGroupList를 알파벳 순서로 정렬합니다.
    setUserGroups(userGroupList);

    //  유저 그룹이 없는 경우 인트로 이동
    if (userGroupList.length === 0) {
      timer = setTimeout(() => {
        window.location.href = "/intro";
      }, 0);
    }
  }, [appUsers, userSelectPK, appGroups]);

  // 유저 정보를 변수로 저장하여 렌더링 시 재사용
  const userName = user.nm;
  const userPic = user.pic;
  const userBirth = user.birth;
  let timer; // 타이머 아이디

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header>
        <BackDiv>
          <Link to={`/main/${params.iuser}/${params.igroup}`}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Link>
        </BackDiv>
        <HeaderUser>
          <UIDdiv>
            <Imgdiv>
              {userPic && <img src={`/img/${userPic}`} alt={userName} />}
            </Imgdiv>
            <TitleUser>{userName}</TitleUser>
            <SubTitle>{groupGnm}</SubTitle>
          </UIDdiv>
        </HeaderUser>
      </Header>
      <Information>
        <div>
          <Title>유저 정보</Title>
          <UserNmBirth>
            이름: <span>{userName}</span>
          </UserNmBirth>
          <UserNmBirth>
            생일: <span>{userBirth}</span>
          </UserNmBirth>
        </div>
        <div>
          <Title>{userName}의 그룹 리스트</Title>
          <Grouplist>
            {userGroups.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </Grouplist>
        </div>
        <div>
          <Title>{groupGnm} Group Member List</Title>
          <Userlist>
            {groupList.map((item, index) => (
              <UserLi key={index}>
                <UserImgdiv>
                  {item.pic && <img src={`/img/${item.pic}`} alt={item.nm} />}
                </UserImgdiv>
                <span>{item.nm}</span>
              </UserLi>
            ))}
          </Userlist>
        </div>
      </Information>
    </>
  );
};

export default About;
