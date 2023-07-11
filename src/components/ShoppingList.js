import { DatePicker, Button, Modal, Select, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import { useEffect, useState, useRef } from "react";
import {
  ShoppingWrap,
  ShoppingDiv,
  ShoppingListSC,
} from "../style/ShoppingListCss";
import ListItem from "./ListItem";
import {
  getItemList,
  postItem,
  patchPlan,
  getCate,
  getUnit,
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
  planDelete,
  setOpenShopList,
  fetchPlanData,
  shopList,
  setShopList,
}) => {
  // 날짜별 장보기 목록 state

  // 스크롤 영역 너비 state
  const [scHeight, setScHeight] = useState(400);
  const [isClicked, setIsClicked] = useState(false);
  // 모달창
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs(openShopListDate, "YYYY/MM/DD"),
  );
  const [cateList, setCateList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [selecCate, setSelecCate] = useState("카테고리");
  const [itemName, setItemName] = useState("");
  const [selecUnit, setSelecUnit] = useState("단위");
  const [ea, setEa] = useState();
  const shoppingListRef = useRef(null);
  // 손정민 작업
  // 아이디 전달 받아서 finishYn 변경하기
  const itemChecked = _id => {
    const arr = shopList.map(item => {
      if (item.iproduct === _id) {
        item.finishYn = item.finishYn === 0 ? 1 : 0;
      }
      return item;
    });
    const checkedItem = arr.find(item => item.iproduct === _id);
    if (checkedItem.finishYn === 0) {
      const filteredArr = arr.filter(item => item.iproduct !== _id);
      setShopList([checkedItem, ...filteredArr]);
    } else {
      setShopList(arr);
    }
  };

  // 아이디 전달 받아서 삭제하기
  const itemDelete = _iproduct => {
    // filter 를 이용해서 state 갱신하기
    const newArr = shopList.filter(item => item.iproduct !== _iproduct);
    setShopList(newArr);
  };

  // 아이디 전달 받아서 업데이트
  // const itemUpdate = _obj => {
  //   const newArr = shopList.map(item => {
  //     if (item.iproduct === _obj.iproduct) {
  //       item = { ..._obj };
  //     }
  //     return item;
  //   });

  //   setShopList(newArr);
  // };
  const itemUpdate = async _obj => {
    if (_obj.finishYn === 0) {
      const updatedList = shopList.map(item => {
        if (item.iproduct === _obj.iproduct) {
          return { ...item, ..._obj };
        }
        return item;
      });
      setShopList(updatedList);
    } else {
      const newArr = shopList.filter(item => item.iproduct !== _obj.iproduct);
      setShopList([...newArr, _obj]);
    }
  };
  // 손정민 작업========================= END

  const fetchItemList = async () => {
    const data = await getItemList(userGroupPK, planPK);
    // axios 아이템 리스트
    console.log("axios 아이템 리스트", data);
    setShopList(data);
  };
  const fetchCateData = async () => {
    const result = await getCate();
    setCateList(result);
  };
  const fetchUnitData = async () => {
    const result = await getUnit();
    setUnitList(result);
  };
  const handleClick = () => {
    setIsClicked(!isClicked);
    if (isClicked) {
      setScHeight(400);
    } else {
      setScHeight(700);
    }
  };
  // 날짜 바뀌는 거
  const onChange = async (date, dateString, planPK) => {
    setSelectedDate(date);
    await patchPlan(planPK, dateString);
    fetchPlanData();
  };

  // 전체선택 삭제
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
    planDelete(planPK);
    setOpenShopList(false);

    // fetchItemList();
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleAddItemList = () => {
    setIsModalOpen(true);
    // fetchItemList();
  };
  // 손정민 추가 리스트 추가 기능
  const handleAddListOk = async () => {
    setIsModalOpen(false);
    console.log("목록 추가");
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
    // console.log("아이템 추가 내용", item);
    await postItem(item);
    fetchItemList();
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    setSelecCate("카테고리");
    setSelecUnit("단위");
    setEa(1);
    setItemName(null);
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
    if (planPK) {
      fetchItemList();
    }
  }, [planPK]);

  useEffect(() => {
    fetchCateData();
    fetchUnitData();
  }, []);

  return (
    <ShoppingWrap
      className={openShopList ? "shopping-list-open" : "shopping-list-close"}
    >
      <ShoppingDiv
        className={isClicked ? "shopping-div-top" : "shopping-div-middle"}
      >
        <DatePicker
          style={{ width: "20%" }}
          onChange={(data, dataStrign) => onChange(data, dataStrign, planPK)}
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
          {shopList.length > 0 ? (
            shopList.map(item => (
              <ListItem
                key={item.iproduct}
                item={item}
                itemUpdate={itemUpdate}
                itemDelete={itemDelete}
                itemChecked={itemChecked}
                cateList={cateList}
                unitList={unitList}
              />
            ))
          ) : (
            <h1>장바구니가 비어 있습니다.</h1>
          )}
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
          <Button
            style={{ backgroundColor: "#006127" }}
            key="submit"
            type="primary"
            onClick={handleDeleteOk}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>,
          <Button key="back" onClick={handleDeleteCancel}>
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
          <Button
            style={{ backgroundColor: "#006127" }}
            key="submit"
            type="primary"
            onClick={handleAddListOk}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>,
          <Button key="back" onClick={handleCancel}>
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
