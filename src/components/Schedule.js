import { Calendar, Modal } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import locale from "antd/es/calendar/locale/ko_KR";
import "../style/schedule.css";
import FirstItem from "./FirstItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";

const Schedule = ({
  setOpenShopList,
  setOpenShopListDate,
  openShopList,
  plan,
}) => {
  const [value, setValue] = useState(() => dayjs(Date.now()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(Date.now()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemList, setItemList] = useState([]);

  const itemChange = _obj => {
    console.log("itemChange", _obj);
    // itemList 의 state에서 index 에 해당하는 키:값 변경
    const newList = itemList.map(item => {
      if (item.index === _obj.index) {
        console.log(item.index, _obj.index);

        item = { ..._obj };
      }
      console.log(item);
      return item;
    });
    setItemList(newList);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    handleAddItem();
  };

  const handleOk = () => {
    setItemList([]);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setItemList([]);
    setIsModalOpen(false);
  };

  const handleAddItem = () => {
    setItemList(prevItems => [
      ...prevItems,
      {
        index: Date.now(),
        icate: "카테고리",
        iunit: "단위",
        nm: "",
        cnt: 1,
      },
    ]); // 새로운 아이템 추가
  };

  const onDelete = index => {
    const newItemList = itemList.filter(item => item.index !== index);
    setItemList(newItemList);
  };

  const onSelect = newValue => {
    setValue(newValue);
    setSelectedValue(newValue);
    const dateString = newValue.format("YYYY-MM-DD");
    const result = plan.find(item => item.createdAt === dateString);

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
    const result = plan.find(item => item.createdAt === dateString);

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
        destroyOnClose={true}
      >
        <button
          className="block float-right mr-10 text-xl"
          onClick={handleAddItem}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {isModalOpen && (
          <div>
            {itemList.map((item, index) => (
              <FirstItem
                key={index}
                onDelete={onDelete}
                item={item}
                itemChange={itemChange}
                handleAddItem={handleAddItem}
              />
            ))}
          </div>
        )}
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
