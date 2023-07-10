import React, { useEffect, useState } from "react";
import {
  ItemDelete,
  ItemListCate,
  ItemListName,
  ItemListUnit,
  ItemUser,
  ItemWrap,
} from "../style/ListItemCss";
import {
  Button,
  Checkbox,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  deleteItemList,
  getCate,
  getUnit,
  patchCompleteList,
  patchItemList,
} from "../api/fetch";
import {
  ModalCate,
  ModalCnt,
  ModalName,
  ModalUnit,
  ModalWrap,
} from "../style/ShoppingListCss";

const ListItem = ({
  item,
  itemUpdate,
  itemDelete,
  itemChecked,
  cateList,
  unitList,
}) => {
  // const [cateList, setCateList] = useState();
  // const [unitList, setUnitList] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [itemNm, setItemNm] = useState("");
  const [itemCateNm, setItemCateNm] = useState("");
  const [itemCate, setItemCate] = useState(0);
  const [itemIUnit, setItemIUnit] = useState("");
  const [itemUnitNm, setItemUnitNm] = useState("");
  const [itemCnt, setItemCnt] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setItemNm(item.nm);
    setItemCate(item.icate);
    setItemCateNm(item.cateNm);
    setItemIUnit(item.uinit);
    setItemUnitNm(item.unitNm);
    setItemCnt(item.cnt);
    if (item.finishYn === 1) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [isChecked, isModalOpen]);
  useEffect(() => {
    // fetchCateData();
    // fetchUnitData();
  }, []);
  // const fetchCateData = async () => {
  //   const data = await getCate();
  //   setCateList(data);
  // };
  // const fetchUnitData = async () => {
  //   const data = await getUnit();
  //   setUnitList(data);
  // };
  const onCheckClick = async e => {
    e.stopPropagation();
    itemChecked(item.iproduct);
    await patchCompleteList(item.iproduct);
    setIsChecked(e.target.checked);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsChecked(false);
    // 데이터를 수정하는 것을 모은다.
    const newObj = {
      ...item,
      cateNm: itemCateNm,
      nm: itemNm,
      cnt: itemCnt,
      unitNm: itemUnitNm,
      icate: itemCate,
    };
    // 아이템 수정 fetch
    patchItemList(
      newObj.iproduct,
      newObj.icate,
      newObj.nm,
      newObj.cnt,
      newObj.iunit,
    );

    itemUpdate(newObj);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsChecked(false);
    setItemNm(item.nm);
    setItemCate(item.icate);
    setItemCateNm(item.cateNm);
    setItemIUnit(item.uinit);
    setItemUnitNm(item.unitNm);
    setItemCnt(item.cnt);
  };

  const handleDeleteClick = e => {
    // 클릭 이벤트 아래로 클릭 이벤트 전달 안 하기
    e.stopPropagation();
    console.log("삭제클릭");
    deleteItemList(item.iproduct);
    itemDelete(item.iproduct);
  };

  const onChangeCateNm = value => {
    // console.log("changed", value);
    // console.log(`selected ${value}`);
    const cat = cateList.find(item => item.value === parseInt(value));
    setItemCate(parseInt(value));
    setItemCateNm(cat.label);
  };
  const onChangeNm = e => {
    // console.log("changed value ", e.target.value);
    setItemNm(e.target.value);
  };
  const onChangeUnitNm = value => {
    // console.log("changed", value);
    const cat = unitList.find(item => item.value === parseInt(value));

    setItemIUnit(parseInt(value));
    setItemUnitNm(cat.label);
  };
  // 수량
  const onChangeCnt = value => {
    // console.log("changed", value);
    setItemCnt(parseInt(value));
  };
  const handleModalClick = () => {
    showModal();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 수정사항 반영
  // const handleCateChange = () => {
  //   setCateList();
  // };
  // const handleNameChange = () => {
  //   setName();
  // };
  // const handleUnitChange = () => {
  //   setUnitList();
  // };

  return (
    <>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        destroyOnClose={true}
        footer={[
          <Button
            style={{ backgroundColor: "#006127" }}
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>,
          <Button key="back" onClick={handleCancel}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>,
        ]}
      >
        <ModalWrap>
          <Space>
            <ModalCate>
              <Select
                // value={cateList}
                defaultValue={itemCateNm}
                style={{
                  width: 120,
                }}
                options={cateList}
                onChange={onChangeCateNm}
                // handleCateChange={setCateList}
              />
            </ModalCate>
            <ModalName>
              {" "}
              <Input defaultValue={itemNm} onChange={onChangeNm} />
            </ModalName>
            <ModalCnt>
              <InputNumber defaultValue={itemCnt} onChange={onChangeCnt} />
            </ModalCnt>
            <ModalUnit>
              <Select
                // value={unitList}
                defaultValue={itemUnitNm}
                options={unitList}
                onChange={onChangeUnitNm}
                // handleUnitChange={setUnitList}
              />
            </ModalUnit>
          </Space>
        </ModalWrap>
      </Modal>
      {/* 목록 관련 ============ */}
      <ItemWrap
        className={`ItemWrap ${isChecked ? "completed" : ""}`}
        onClick={handleModalClick}
      >
        <Checkbox
          style={{ padding: "15px" }}
          onClick={onCheckClick}
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
          value={item.finishYn}
        ></Checkbox>
        <ItemListCate>{item.cateNm}</ItemListCate>
        <ItemListName>{item.nm}</ItemListName>
        <ItemListUnit>
          {item.cnt}
          <em>{item.unitNm}</em>
        </ItemListUnit>
        <ItemDelete onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} />
        </ItemDelete>
        <ItemUser>{item.wuserNm}</ItemUser>
      </ItemWrap>
    </>
  );
};

export default ListItem;
