import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Header,
  UIDdiv,
  Imgdiv,
  Title,
  Information,
  SubTitle,
} from "../style/AboutCss";
import { getUserAll } from "../api/fetch";

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

  return (
    <>
      <Header>
        <UIDdiv>
          <Imgdiv>{userPic && <img src={userPic} alt={userName} />}</Imgdiv>
          <Title>{userName}</Title>
          <SubTitle>{groupGnm}</SubTitle>
        </UIDdiv>
      </Header>
      <Information>
        <div>
          <Title>유저 정보</Title>
          <p>이름 : {userName}</p>
          <p>생일 : {userBirth}</p>
        </div>
        <div>
          <Title>그룹 정보</Title>
          <SubTitle>Group List</SubTitle>
          {userGroups.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          <SubTitle>Group Members</SubTitle>
          {groupList.map((item, index) => (
            <div key={index}>
              {item.pic && <img src={item.pic} alt={item.nm} />}
              {item.nm}
            </div>
          ))}
        </div>
      </Information>
    </>
  );
};

export default About;
