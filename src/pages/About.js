import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Header,
  HeaderUSer,
  UIDdiv,
  BackDiv,
  Imgdiv,
  BackImg,
  Title,
  Information,
  SubTitle,
  Userlist,
  UserLi,
  UserImgdiv,
  UserNmBirth,
  Grouplist,
} from "../style/AboutCss";
import { getUserAll, getUserPatch } from "../api/fetch";

const About = ({ appUsers, appGroups }) => {
  const params = useParams();
  const userSelectPK = parseInt(params.iuser);
  const userGroupSelectPK = parseInt(params.igroup);
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [groupPK, setGroupPK] = useState("");
  const [groupGnm, setGroupGnm] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const parseUserInfo = () => {
      const nowUserFind = appUsers.find(
        item =>
          item.iuser === userSelectPK && item.igroup === userGroupSelectPK,
      );
      if (nowUserFind) {
        setUserName(nowUserFind.nm);
        setUserPic(nowUserFind.pic);
        setGroupPK(nowUserFind.igroup);
        setUserBirth(nowUserFind.birth);
      }
    };

    parseUserInfo();
  }, [appUsers, userSelectPK, userGroupSelectPK]);

  useEffect(() => {
    const fetchGroupList = async () => {
      const data = await getUserAll();
      const filteredList = data.filter(
        item => item.igroup === userGroupSelectPK,
      );
      setGroupList(filteredList);
    };

    fetchGroupList();
  }, [userGroupSelectPK]);

  useEffect(() => {
    const group = appGroups.find(group => group.igroup === groupPK);
    if (group) {
      setGroupGnm(group.gnm);
    }
  }, [appGroups, groupPK]);

  useEffect(() => {
    const userGroupList = appUsers
      .filter(user => user.iuser === userSelectPK)
      .map(user => {
        const group = appGroups.find(group => group.igroup === user.igroup);
        return group ? group.gnm : "";
      });
    setUserGroups(userGroupList);
  }, [appUsers, userSelectPK, appGroups]);
  const handleUpdateUser = async () => {
    try {
      await getUserPatch(userName, userBirth);
      console.log("사용자 정보가 업데이트되었습니다.");
    } catch (error) {
      console.log("사용자 정보 업데이트 오류:", error);
    }
  };
  return (
    <>
      <Header>
        <BackDiv>
          <Link to={`/main/${params.iuser}/${params.igroup}`}>
            <BackImg src={`${process.env.PUBLIC_URL}/images/backarrow.png`} />
          </Link>
        </BackDiv>
        <HeaderUSer>
          <UIDdiv>
            <Imgdiv>
              {userPic && <img src={`/img/${userPic}`} alt={userName} />}
            </Imgdiv>
            <Title>{userName}</Title>
            <SubTitle>{groupGnm}</SubTitle>
          </UIDdiv>
        </HeaderUSer>
      </Header>
      <Information>
        <div>
          <Title>유저 정보</Title>
          <UserNmBirth>이름 : {userName}</UserNmBirth>
          <UserNmBirth>생일 : {userBirth}</UserNmBirth>
          <button onClick={handleUpdateUser}>수정</button>
        </div>
        <div>
          <Title>그룹 정보</Title>
          <SubTitle>Group List</SubTitle>
          <Grouplist>
            {userGroups.map((item, index) => (
              <UserLi key={index}>{item}</UserLi>
            ))}
          </Grouplist>
          <SubTitle>Group Members</SubTitle>
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
