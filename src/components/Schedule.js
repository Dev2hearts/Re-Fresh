import { Calendar, Modal } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import locale from "antd/es/calendar/locale/ko_KR";
import "../style/schedule.css";
import FirstItem from "./FirstItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";

const Schedule = ({ setOpenShopList, setOpenShopListDate, openShopList }) => {
  const hi = [{ date: "2023-06-29" }, { date: "2023-07-07" }];
  const [value, setValue] = useState(() => dayjs(Date.now()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(Date.now()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setItems([{}]); // 모달 열 때 아이템 초기화
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setItems([{}]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setItems([]);
  };

  const handleAddItem = () => {
    setItems(prevItems => [...prevItems, {}]); // 새로운 아이템 추가
  };

  const onDelete = index => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index)); // 아이템 삭제
  };


  const onSelect = newValue => {
    setValue(newValue);
    setSelectedValue(newValue);
    const dateString = newValue.format("YYYY-MM-DD");
    const result = hi.find(item => item.date === dateString);

    if ((openShopList && !result) || !result) {
      handleModalOpen(); // 모달 열기
      setOpenShopListDate("");
      setOpenShopList(false);
    } else {
      setOpenShopList(true);
    }

    setOpenShopListDate(newValue.format("YYYY/MM/DD"));
  };

  const onPanelChange = newValue => {
    setValue(newValue);
  };

  useEffect(() => {
    const th = document.querySelectorAll(".ant-picker-content th");
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    th.forEach((item, index) => {
      item.innerHTML = day[index]; // 캘린더 요일 텍스트 설정
    });
  }, []);

  const cellRender = date => {
    const dateString = date.format("YYYY-MM-DD");
    const result = hi.find(item => item.date === dateString);

    if (result) {
      return (
        <div className="text-right text-gray-500">
          {<FontAwesomeIcon icon={faCartShopping} />}
        </div>
      );
    }

    return null;
  };

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
        {items.map((_, index) => (
          <FirstItem key={index} onDelete={onDelete} index={index} /> 
        ))}
      </Modal>
      <Calendar
        locale={locale}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={cellRender}
      />
      {!openShopList && <div>{selectedValue?.format("YYYY-MM-DD")}</div>}
    </div>
  );
};

export default Schedule;
