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
import { getCate, getUnit } from "../api/fetch";
import {
  ModalCate,
  ModalCnt,
  ModalName,
  ModalUnit,
  ModalWrap,
} from "../style/ShoppingListCss";

const ListItem = ({ item }) => {
  const [cateList, setCateList] = useState();
  const [unitList, setUnitList] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fetchCateData = async () => {
    const data = await getCate();
    setCateList(data);
  };
  const fetchUnitData = async () => {
    const data = await getUnit();
    setUnitList(data);
  };
  useEffect(() => {
    fetchCateData();
    fetchUnitData();
  }, []);
  const onClick = e => {
    e.stopPropagation();
    console.log(`checked = ${e.target.checked}`);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  const handleDeleteClick = e => {
    console.log("삭제클릭");
    // 이벤트 전달 안 하기
    e.stopPropagation();
  };
  // 수량
  const onChangeCnt = value => {
    console.log("changed", value);
  };
  const handleModalClick = () => {
    showModal();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
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
        <ModalWrap>
          <Space>
            <ModalCate>
              <Select
                // value={cateList}
                defaultValue={item.cateNm}
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={cateList}
              />
            </ModalCate>
            <ModalName>
              {" "}
              <Input defaultValue={item.nm} />
            </ModalName>
            <ModalCnt>
              <InputNumber defaultValue={item.cnt} onChange={onChangeCnt} />
            </ModalCnt>
            <ModalUnit>
              <Select
                // value={unitList}
                defaultValue={item.unitNm}
                options={unitList}
              />
            </ModalUnit>
          </Space>
        </ModalWrap>
      </Modal>
      <ItemWrap  onClick={handleModalClick}>
        <Checkbox
          onClick={onClick}
          value={item.finishYn}
          defaultChecked={item.completed}
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
