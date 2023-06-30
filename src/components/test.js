import { Calendar, Modal } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import locale from "antd/es/calendar/locale/ko_KR";
import "../style/schedule.css";
import FirstItem from "./FirstItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// 손정민 추가 코드(쇼핑리스트 출력 : state 전달)
const Schedule = ({ setOpenShopList, setOpenShopListDate, openShopList }) => {
  const hi = [{ date: "2023-06-29" }, { date: "2023-07-07" }];
  const [value, setValue] = useState(() => dayjs(Date.now()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(Date.now()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addItems, setAddItems] = useState([<FirstItem key={0} />]);
  const cellRender = date => {
    const dateString = date.format("YYYY-MM-DD");

    const result = hi.find(item => {
      if (item.date === dateString) {
        return item;
      }
    });
    if (result) {
      return <div>{"장보는날"}</div>;
    }
    return null;
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePlusClick = () => {
    setAddItems(prevItems => [
      ...prevItems,
      <FirstItem key={prevItems.length} />,
    ]);
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
    // 손정민 추가 코드(목록이 펼쳐진 경우 구분)
    if (openShopList) {
      setOpenShopList(false);
      if (!result) {
        showModal();
        // 손정민 추가 코드(쇼핑리스트 출력)
        setOpenShopListDate("");
        setOpenShopList(false);
      }
    } else {
      if (!result) {
        showModal();
        // 손정민 추가 코드(쇼핑리스트 출력)
        setOpenShopListDate("");
        setOpenShopList(false);
      } else {
        // 손정민 추가 코드(쇼핑리스트 출력)
        setOpenShopList(true);
      }
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
      >
        <button
          className="block float-right mr-10 text-xl"
          onClick={handlePlusClick}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {addItems}
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