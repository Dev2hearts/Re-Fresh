import { Calendar, Modal } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import locale from "antd/es/calendar/locale/ko_KR";
import "../style/schedule.css";
import FirstItem from "./FirstItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";

// 손정민 추가 코드(쇼핑리스트 출력 : state 전달)
const Schedule = ({ setOpenShopList, setOpenShopListDate, openShopList }) => {
  const hi = [{ date: "2023-06-29" }, { date: "2023-07-07" }];
  const [value, setValue] = useState(() => dayjs(Date.now()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(Date.now()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const cellRender = date => {
    const dateString = date.format("YYYY-MM-DD");

    const result = hi.find(item => {
      if (item.date === dateString) {
        return item;
      }
    });
    if (result) {
      return (
        <div className="text-right text-gray-500">
          {<FontAwesomeIcon icon={faCartShopping} />}
        </div>
      );
    }
    return null;
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setItems([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setItems([]);
  };
  const handleAddItem = () => {
    // setItems(prevItems => [...prevItems, <FirstItem onDelete={() => handleDeleteItem(prevItems.length)} key={prevItems.index}/>]);
    setItems([...items, {}]);
  };
  const [cateList, setCateList] = useState([
    {
      value: "냉동식품",
      label: "냉동식품",
    },
    {
      value: "과일/채소",
      label: "과일/채소",
    },
    {
      value: "유제품",
      label: "유제품",
    },
  ]);
  // 추가
  const onDelete = _id => {
    const newItemArr = items.filter((item, index) => index !== _id);
    setItems(newItemArr);
  };
  const handleDeleteItem = index => {
    // setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
    setItems([{}]);
  };
  const onSelect = newValue => {
    setValue(newValue);
    setSelectedValue(newValue);
    const dateString = newValue.format("YYYY-MM-DD");
    const result = hi.find(item => {
      if (item.date === dateString) {
        return item;
      }
    });
    if (!result) {
      handleModalOpen();
      // 손정민 추가 코드(쇼핑리스트 출력)
      setOpenShopListDate("");
      setOpenShopList(false);
    } else {
      // 손정민 추가 코드(쇼핑리스트 출력)
      setOpenShopList(true);
    }
    setValue(newValue);
    setSelectedValue(newValue);
    // 손정민 추가 코드(쇼핑리스트 출력)
    setOpenShopListDate(newValue.format("YYYY/MM/DD"));
  };
  const onPanelChange = newValue => {
    setValue(newValue);
  };
  useEffect(() => {
    const th = document.querySelectorAll(".ant-picker-content th");
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    th.forEach((item, index) => {
      item.innerHTML = day[index];
    });
  }, []);
  return (
    <div>
      <Modal
        title={`${selectedValue?.format("YYYY-MM-DD")}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        okText={"등록"}
        cancelText={"취소"}
      >
        <button
          className="block float-right mr-10 text-xl"
          onClick={handleAddItem}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {items.map((item, index) => (
          // <div key={index}>{item}</div>
          // <FirstItem onDelete={() => handleDeleteItem(prevItems.length)} key={prevItems.index}/>
          <FirstItem
            key={index}
            onDelete={onDelete}
            index={index}
            cateList={cateList}
          />
        ))}
      </Modal>
      <Calendar
        locale={locale}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={cellRender}
      />
      <div style={openShopList ? { display: "none" } : { display: "block" }}>
        {selectedValue?.format("YYYY-MM-DD")}
      </div>
    </div>
  );
};

export default Schedule;
