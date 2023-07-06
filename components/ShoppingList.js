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
import {
  deleteItemList,
  getCate,
  getItemList,
  getUnit,
  patchItemList,
  postItem,
} from "../api/fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { ItemBox } from "../style/FirstItemCss";

const ShoppingList = ({
  openShopListDate,
  openShopList,
  userGroupPK,
  planPK,
  userPK,
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
  const [cateList, setCateList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [selecCate, setSelecCate] = useState("카테고리");
  const [itemName, setItemName] = useState("");
  const [selecUnit, setSelecUnit] = useState("단위");
  const [ea, setEa] = useState();

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

  const handleAddItemList = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setSelecCate("카테고리");
    setSelecUnit("단위");
    setEa(1);
    setItemName(null);
    const item = {
      iplan: planPK,
      icate: selecCate,
      nm: itemName,
      cnt: ea,
      iunit: selecUnit,
      wiuser: userPK,
    };
    postItem(item);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelecCate("카테고리");
    setSelecUnit("단위");
    setEa(1);
    setItemName(null);
  };
  const handleCateChange = value => {
    setSelecCate(value);
  };
  const handleItemNameChange = e => {
    setItemName(e.target.value);
  };
  const handleEaChange = value => {
    setEa(value);
  };
  const handleUnitChange = value => {
    setSelecUnit(value);
  };
  // 전체 선택 눌렀을 때 창 내려가기
  useEffect(() => {
    // 렌더링 시 초기값 설정
    setSelectedDate(dayjs(openShopListDate, "YYYY/MM/DD"));
  }, [openShopListDate]);

  useEffect(() => {
    const fetchItemList = async () => {
      const data = await getItemList(userGroupPK, planPK);
      // axios 아이템 리스트
      console.log(data);
      setShopList(data);
    };
    if (planPK) {
      fetchItemList();
    }
  }, [planPK]);
  useEffect(() => {
    const fetchCateData = async () => {
      const result = await getCate();
      setCateList(result);
    };
    const fetchUnitData = async () => {
      const result = await getUnit();
      setUnitList(result);
    };
    fetchCateData();
    fetchUnitData();
  }, []);
  const itemUpdate = _obj => {
    console.log("뭐지", _obj);
    // 아이템 수정 fetch
    patchItemList(_obj.iproduct, _obj.icate, _obj.nm, _obj.cnt, _obj.iunit);
    const newArr = shopList.map(item => {
      if (item.iproduct === _obj.iproduct) {
        item = { ..._obj };
      }
      return item;
    });

    setShopList(newArr);
  };
  const itemDelete = _iproduct => {
    deleteItemList(_iproduct);
    // filter 를 이용해서 state 갱신하기
    const newArr = shopList.filter(item => item.iproduct !== _iproduct);
    setShopList(newArr);
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

        <ShoppingListSC scHeight={scHeight}>
          {shopList.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              itemUpdate={itemUpdate}
              itemDelete={itemDelete}
            />
          ))}
        </ShoppingListSC>
        <button className="delete-schedule" onClick={showDeleteModal}>
          <FontAwesomeIcon
            icon={faTrashCan}
            style={{ fontSize: "15px", alignContent: "center" }}
          />
        </button>
        <button className="add-schedule" onClick={handleAddItemList}>
          <FontAwesomeIcon icon={faPlus} style={{ fontSize: "15px" }} />
        </button>
      </ShoppingDiv>

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
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        okText={"등록"}
        cancelText={"취소"}
        centered
        footer={[
          <Button key="back" onClick={handleOk}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>,
          <Button
            style={{ backgroundColor: "#1677ff" }}
            key="submit"
            type="primary"
            onClick={handleCancel}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>,
        ]}
      >
        <ItemBox>
          <div className="flex justify-between">
            <Select
              style={{
                width: 205,
              }}
              onChange={handleCateChange}
              disabled={false}
              value={selecCate}
              options={cateList}
              defaultValue={"카테고리"}
            />
          </div>

          <div className="flex flex-wrap gap-1">
            <Input
              placeholder="구매 목록"
              value={itemName}
              disabled={false}
              onChange={handleItemNameChange}
            />
            <InputNumber
              className="flex-1"
              value={ea}
              disabled={false}
              onChange={handleEaChange}
              defaultValue={1}
            />
            <Select
              className="flex-1"
              defaultValue={"단위"}
              value={selecUnit}
              onChange={handleUnitChange}
              options={unitList}
            />
          </div>
        </ItemBox>
      </Modal>
    </ShoppingWrap>
  );
};

export default ShoppingList;
