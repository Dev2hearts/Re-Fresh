import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import Schedule from "../components/Schedule";
import ShoppingList from "../components/ShoppingList";
import { getUserAll, getPlan } from "../api/fetch";

const Main = () => {
  const params = useParams();
  const userPK = parseInt(params.iuser);
  const userGroupPK = parseInt(params.igroup);
  const [userList, setUserList] = useState([]);
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
      <Header />
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
