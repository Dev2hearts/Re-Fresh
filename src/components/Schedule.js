import { Calendar, Modal, Button } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import locale from "antd/es/calendar/locale/ko_KR";
import "../style/schedule.css";
import FirstItem from "./FirstItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";
import { postPlan, getPlan, postItem } from "../api/fetch";

const Schedule = ({
  setOpenShopList,
  setOpenShopListDate,
  openShopList,
  plan,
  setPlan,
  setPlanPK,
  userGroupPK,
  userPK,
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
  const handleOk = async () => {
    setItemList([]);
    setIsModalOpen(false);
    const planData = {
      igroup: userGroupPK,
      iuser: userPK,
      createdAt: selectedValue.format("YYYY-MM-DD"),
    };
    const postData = await postPlan(planData);
    const getData = await getPlan(userGroupPK);
    setPlan(getData);

    // itemList의 각 객체를 순회하며 postItem 요청 보내기
    itemList.forEach(async item => {
      const itemData = {
        iplan: postData, // 이전에 생성된 plan의 iplan 값을 사용
        icate: item.icate,
        nm: item.nm,
        cnt: item.cnt,
        iunit: item.iunit,
        wiuser: userPK,
      };
      console.log(itemData);
      await postItem(itemData);
    });
    setOpenShopList(true);
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
      setPlanPK(null);
    } else if (openShopList) {
      setOpenShopList(false);
    } else {
      setOpenShopList(true);
      console.log(result.iplan);
      setPlanPK(result.iplan);
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
    console.log(plan);
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
        destroyOnClose={true}
        footer={[
          <Button
            onClick={handleOk}
            style={{ backgroundColor: "#1677ff" }}
            key="submit"
            type="primary"
          >
            등록
          </Button>,
          <Button key="back" onClick={handleCancel}>
            취소
          </Button>,
        ]}
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
