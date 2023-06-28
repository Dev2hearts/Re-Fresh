// import ItemList from "./ItemList";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { ShoppingWrap, ShoppingDiv } from "../style/ShoppingListCss";
import ListItem from "./ListItem";

const ShoppingList = ({ openShopListDate, openShopList }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <ShoppingWrap
      className={openShopList ? "shopping-list-open" : "shopping-list-close"}
    >
      <ShoppingDiv
        className={isClicked ? "shopping-div-top" : "shopping-div-middle"}
      >
        <DatePicker
          onChange={onChange}
          value={dayjs(openShopListDate, "YYYY/MM/DD")}
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
      </ShoppingDiv>
    </ShoppingWrap>
  );
};

export default ShoppingList;
