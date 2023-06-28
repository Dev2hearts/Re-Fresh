import React, { useState } from "react";
import Header from "../components/Header";
import Schedule from "../components/Schedule";
import ShoppingList from "../components/ShoppingList";
import "../style/shoppinglist.css";
const Main = () => {
  // 목록 열기 내리기
  const [openShopList, setOpenShopList] = useState(false);
  const [openShopListDate, setOpenShopListDate] = useState("");
  return (
    <div
      style={{ position: "relative", background: "yellow", height: "100vh" }}
    >
      <Header />
      <div>
        <Schedule
          setOpenShopList={setOpenShopList}
          setOpenShopListDate={setOpenShopListDate}
          openShopList={openShopList}
        />
        <ShoppingList
          openShopListDate={openShopListDate}
          openShopList={openShopList}
        />
      </div>
    </div>
  );
};

export default Main;
