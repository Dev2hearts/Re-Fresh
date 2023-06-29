// import ItemList from "./ItemList";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  ShoppingWrap,
  ShoppingDiv,
  ShoppingListSC,
} from "../style/ShoppingListCss";
import ListItem from "./ListItem";

const ShoppingList = ({ openShopListDate, openShopList }) => {
  // 날짜별 장보기 목록 state
  const [shopList, setShopList] = useState([]);
  useEffect(() => {
    // axios 연동
    const tempList = [{}, {}, {}, {}, {}, {}];
    setShopList(tempList);
  }, []);
  // 스크롤 영역 너비 state
  const [scHeight, setScHeight] = useState(400);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs(openShopListDate, "YYYY/MM/DD"),
  );
  const handleClick = () => {
    setIsClicked(!isClicked);
    if (isClicked) {
      setScHeight(400);
    } else {
      setScHeight(800);
    }
  };
  const onChange = (date, dateString) => {
    setSelectedDate(date);
    console.log(dateString);
  };
  useEffect(() => {
    // 렌더링 시 초기값 설정
    setSelectedDate(dayjs(openShopListDate, "YYYY/MM/DD"));
  }, [openShopListDate]);

  return (
    <ShoppingWrap
      className={openShopList ? "shopping-list-open" : "shopping-list-close"}
    >
      <ShoppingDiv
        className={isClicked ? "shopping-div-top" : "shopping-div-middle"}
      >
        <DatePicker
          onChange={onChange}
          value={selectedDate}
          defaultValue={dayjs(openShopListDate, "YYYY/MM/DD")}
        />
        <div className="listOpen">
          <button>
            <img
              src={
                isClicked
                  ? `${process.env.PUBLIC_URL}/images/arrow2.png`
                  : `${process.env.PUBLIC_URL}/images/arrow1.png`
              }
              alt="화살표"
              onClick={handleClick}
            />
          </button>
        </div>
        <ShoppingListSC scHeight={scHeight}>
          {shopList.map((item, index) => (
            <ListItem key={index} />
          ))}
        </ShoppingListSC>
      </ShoppingDiv>
    </ShoppingWrap>
  );
};

export default ShoppingList;
