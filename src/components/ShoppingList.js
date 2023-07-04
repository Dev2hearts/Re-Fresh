import {
  DatePicker,
  Button,
  Modal,
  Select,
  Input,
  InputNumber,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  ShoppingWrap,
  ShoppingDiv,
  ShoppingListSC,
  ModalCate,
  ModalName,
  ModalUnit,
  ModalWrap,
  ModalCnt,
} from "../style/ShoppingListCss";
import ListItem from "./ListItem";
import { getCate, getItemList, getUnit } from "../api/fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const ShoppingList = ({
  openShopListDate,
  openShopList,
  userGroupPK,
  planPK,
}) => {
  // 날짜별 장보기 목록 state
  const [shopList, setShopList] = useState([]);
 
  // 스크롤 영역 너비 state
  const [scHeight, setScHeight] = useState(400);
  const [isClicked, setIsClicked] = useState(false);
  // 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  // 날짜 바뀌는 거
  const onChange = (date, dateString) => {
    setSelectedDate(date);
    console.log(dateString);
  };


  // 전체선택 삭제
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  // 전체 선택 눌렀을 때 창 내려가기
  useEffect(() => {
    // 렌더링 시 초기값 설정
    setSelectedDate(dayjs(openShopListDate, "YYYY/MM/DD"));
  }, [openShopListDate]);
  useEffect(() => {
    const fetchItemList = async () => {
      const data = await getItemList(userGroupPK, planPK);
      setShopList(data);
    };
    if (planPK) {
      fetchItemList();
    }
  }, [planPK]);
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
            <ListItem key={index} item={item} />
          ))}
        </ShoppingListSC>
      </ShoppingDiv>
      <button className="delete-schedule" onClick={showDeleteModal}>
        <FontAwesomeIcon
          icon={faTrashCan}
          style={{ fontSize: "15px", alignContent: "center" }}
        />
      </button>
      <Modal
        // title="Basic Modal"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        centered
        footer={[
          <Button key="back" onClick={handleDeleteOk}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>,
          <Button
            style={{ backgroundColor: "#1677ff" }}
            key="submit"
            type="primary"
            onClick={handleDeleteCancel}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>,
        ]}
      >
        <p>일정을 삭제하시겠습니까?</p>
      </Modal>
    </ShoppingWrap>
  );
};

export default ShoppingList;
