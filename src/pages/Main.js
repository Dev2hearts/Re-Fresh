import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import Schedule from "../components/Schedule";
import ShoppingList from "../components/ShoppingList";
import { getUserAll, getPlan } from "../api/fetch";

const Main = ({ appUsers }) => {
  const params = useParams();
  const userPK = parseInt(params.iuser);
  const userGroupPK = parseInt(params.igroup);
  const [userList, setUserList] = useState([]);


  // 사용자의 상세한 정보를 userPK 를 통해서 파악한다.
  const [nowUser, setNowUser] = useState({});

  const parseUserInfo = () => {
    const nowUserFind = appUsers.find(item => item.iuser === userPK);
    setNowUser(nowUserFind);
  };
  useEffect(() => {
    const nowUserFind = appUsers.find(item => item.iuser === userPK);
    setNowUser(nowUserFind);
  }, [nowUser]);

  const [plan, setPlan] = useState([123]);

  // 사용자 정보를 axios 로 가지고 옮
  const getAllParse = async () => {
    const data = await getUserAll();
    setUserList(data);
    
  };
  const fetchPlanData = async () => {
    const data = await getPlan(userGroupPK);
    setPlan(data);
  };
  useEffect(() => {
    // 서버에서 회원 전체 자료 가져오기
    getAllParse();
    // 사용자의 정보를 파악한다.
    parseUserInfo();
    fetchPlanData();
  }, []);
  // useEffect(() => {
  //   console.log("사용자 번호: ", userId);
  // }, []);
  // 목록 열기 내리기

  
  const [openShopList, setOpenShopList] = useState(false);
  const [openShopListDate, setOpenShopListDate] = useState("");
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Header nowUser={nowUser} />
      <div>
        <Schedule
          setOpenShopList={setOpenShopList}
          setOpenShopListDate={setOpenShopListDate}
          openShopList={openShopList}
          plan={plan}
          userGroupPK={userGroupPK}
        />
        <ShoppingList
          openShopListDate={openShopListDate}
          openShopList={openShopList}
          plan={plan}
          userGroupPK={userGroupPK}
        />
      </div>
    </div>
  );
};

export default Main;
