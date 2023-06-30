// import ItemList from "./ItemList";
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
import { getCate } from "../api/fetch";

const ShoppingList = ({ openShopListDate, openShopList }) => {
  // 날짜별 장보기 목록 state
  const [shopList, setShopList] = useState([]);
  const [cateList, setCateList] = useState();
  const [unitList, setUnitList] = useState();
  useEffect(() => {
    // axios 연동
    const tempList = [
      {
        icate: "야채2",
        iproduct: "당근2",
        iunit: "g",
        nm: "맛있는 당근4",
        cnt: 100,
        finishYn: true,
        wiuser: "홍길동",
      },
      {
        icate: "야채5",
        iproduct: "당근34",
        iunit: "kg3456",
        nm: "맛있는 346346당근",
        cnt: 100,
        finishYn: true,
        wiuser: "홍길동",
      },
      {
        icate: "야채547",
        iproduct: "당457근",
        iunit: "k457g",
        nm: "맛있457 당근",
        cnt: 100,
        finishYn: true,
        wiuser: "홍길457동",
      },
      {
        icate: "야457채",
        iproduct: "당근",
        iunit: "kg",
        nm: "맛있457는 당근",
        cnt: 100,
        finishYn: true,
        wiuser: "홍457길동",
      },
      {
        icate: "야889채",
        iproduct: "당0-근",
        iunit: "kg",
        nm: "맛있는 70당근",
        cnt: 100,
        finishYn: true,
        wiuser: "홍길동",
      },
      {
        icate: "야채1678",
        iproduct: "당890근",
        iunit: "kg",
        nm: "맛있는 당6789근",
        cnt: 100,
        finishYn: true,
        wiuser: "홍길동",
      },
    ];
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
  const handleModalClick = () => {
    showModal();
  };
  // 날짜 바뀌는 거
  const onChange = (date, dateString) => {
    setSelectedDate(date);
    console.log(dateString);
  };
  useEffect(() => {
    // 렌더링 시 초기값 설정
    setSelectedDate(dayjs(openShopListDate, "YYYY/MM/DD"));
  }, [openShopListDate]);
  // 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //
  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  // 수량
  const onChangeCnt = value => {
    console.log("changed", value);
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
        <ShoppingListSC scHeight={scHeight} onClick={handleModalClick}>
          {shopList.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </ShoppingListSC>
      </ShoppingDiv>
      <button className="delete-schedule">일정삭제</button>

      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="back" onClick={handleOk}>
            수정
          </Button>,
          <Button
            style={{ backgroundColor: "#1677ff" }}
            key="submit"
            type="primary"
            onClick={handleCancel}
          >
            취소
          </Button>,
        ]}
      >
        <ModalWrap>
          <Space>
            <ModalCate>
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={cateList}
              />
            </ModalCate>
            <ModalName>
              {" "}
              <Input placeholder="Basic usage" />
            </ModalName>
            <ModalCnt>
              <InputNumber
                min={1}
                max={10}
                defaultValue={3}
                onChange={onChangeCnt}
              />
            </ModalCnt>
            <ModalUnit>
              <Select
                defaultValue="lucy"
                options={[{ value: "lucy", label: "Lucy" }]}
              />
            </ModalUnit>
          </Space>
        </ModalWrap>
      </Modal>
    </ShoppingWrap>
  );
};

export default ShoppingList;
