import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupAll } from "../api/fetch";

const About = ({ appUsers }) => {
  const params = useParams();
  const userSelectPK = parseInt(params.iuser);
  const userGroupSelectPK = parseInt(params.igroup);
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");
  const [groupPK, setGroupPK] = useState("");
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const parseUserInfo = () => {
      const nowUserFind = appUsers.find(
        (item) => item.iuser === userSelectPK && item.igroup === userGroupSelectPK
      );
      if (nowUserFind) {
        setUserName(nowUserFind.nm);
        setUserPic(nowUserFind.pic);
        setGroupPK(nowUserFind.igroup);
      }
    };

    parseUserInfo();
  }, [appUsers, userSelectPK, userGroupSelectPK]);

  useEffect(() => {
    const fetchGroupList = async () => {
      const data = await getGroupAll();
      const filteredList = data.filter((item) => item.igroup === userGroupSelectPK);
      setGroupList(filteredList);
    };

    fetchGroupList();
  }, [userGroupSelectPK]);
  console.log(groupList);

  return (
    <>
      <div>{userPic}</div>
      <div>{userName}</div>
      <div>{groupPK}</div>
      <div>
        Group List:
        {groupList.map((item, index) => (
          <div key={index}>{item.unm}</div>
        ))}
      </div>
    </>
  );
};

export default About;