import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import Schedule from "../components/Schedule";
import ShoppingList from "../components/ShoppingList";
import { getUserAll, getPlan, deletePlan } from "../api/fetch";

const Main = ({ appUsers }) => {
  const params = useParams();
  const userPK = parseInt(params.iuser);
  const userGroupPK = parseInt(params.igroup);
  const [userList, setUserList] = useState([]);
  const [plan, setPlan] = useState([]);
  const [planPK, setPlanPK] = useState(null);
  // 사용자의 상세한 정보를 userPK 를 통해서 파악한다.
  const [nowUser, setNowUser] = useState({});
  const [openShopList, setOpenShopList] = useState(false);
  const [openShopListDate, setOpenShopListDate] = useState("");
  const planDelete = _iplan => {
    deletePlan(_iplan);
    const newPlan = plan.filter(item => item.iplan !== _iplan);
    console.log("삭제후:", newPlan)
    setPlan(newPlan);
  };
  const parseUserInfo = () => {
    const nowUserFind = appUsers.find(item => item.iuser === userPK);
    setNowUser(nowUserFind);
  };
  useEffect(() => {
    const nowUserFind = appUsers.find(item => item.iuser === userPK);
    setNowUser(nowUserFind);
  }, [nowUser]);

  // 사용자 정보를 axios 로 가지고 옮
  const getAllParse = async () => {
    const data = await getUserAll();
    setUserList(data);
  };
  const fetchPlanData = async () => {
    const data = await getPlan(userGroupPK);
    console.log("Plan Data : ", data);
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

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Header nowUser={nowUser} />
      <div>
        <Schedule
          setOpenShopList={setOpenShopList}
          setOpenShopListDate={setOpenShopListDate}
          openShopList={openShopList}
          setPlan={setPlan}
          plan={plan}
          setPlanPK={setPlanPK}
          userGroupPK={userGroupPK}
          userPK={userPK}
        />
        <ShoppingList
          openShopListDate={openShopListDate}
          openShopList={openShopList}
          planPK={planPK}
          userGroupPK={userGroupPK}
          planDelete={planDelete}
          setOpenShopList={setOpenShopList}
        />
      </div>
    </div>
  );
};

export default Main;
