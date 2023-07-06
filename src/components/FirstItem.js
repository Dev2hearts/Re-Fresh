import React, { useEffect } from "react";
import { useState } from "react";
import { ItemBox } from "../style/FirstItemCss";
import { InputNumber, Input, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { getCate, getUnit } from "../api/fetch";

// 추가 코드 item
const FirstItem = ({ onDelete, itemChange, handleAddItem, item }) => {
  const [cateList, setCateList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [selecCate, setSelecCate] = useState(null);
  const [itemName, setItemName] = useState("");
  const [selecUnit, setSelecUnit] = useState(null);
  const [ea, setEa] = useState(1);

  // const [item, setItem] = useState(null);
  const [items, setItems] = useState({});

  // console.log(index);
  // console.log(items);

  const handleSaveClick = () => {
    setIsEdit(false);
  };
  const handleEditClick = () => {
    setIsEdit(true);
  };
  const handleCancelClick = () => {
    setIsEdit(false);
  };
  const handleRemoveClick = () => {
    onDelete(items.index);
  };
  // 내용이 변하는 경우에 실행할 기능
  const handleCateChange = value => {
    setSelecCate(value);
    const nowItems = { ...items, icate: value };
    setItems(nowItems);
    itemChange(nowItems);
  };
  const handleItemNameChange = e => {
    setItemName(e.target.value);
    const nowItems = { ...items, nm: e.target.value };
    setItems(nowItems);
    itemChange(nowItems);
  };
  const handleEaChange = value => {
    setEa(value);
    const nowItems = { ...items, cnt: value };
    setItems(nowItems);
    itemChange(nowItems);
  };
  const handleUnitChange = value => {
    setSelecUnit(value);
    const nowItems = { ...items, iunit: value };
    setItems(nowItems);
    itemChange(nowItems);
  };

  useEffect(() => {
    setSelecCate(item.icate);
    setItemName(item.nm);
    setSelecUnit(item.iunit);
    setEa(item.cnt);
    setItems(item);
  }, [item]);

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

  if (isEdit) {
    // 편집중
    return (
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
          />
          <button className="text-base">
            <FontAwesomeIcon icon={faTrash} onClick={handleRemoveClick} />
          </button>
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
          />
          <Select
            className="flex-1"
            value={selecUnit}
            onChange={handleUnitChange}
            options={unitList}
          />
        </div>
        <div className="flex justify-around">
          <button className="text-base" onClick={handleSaveClick}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="text-base">
            <FontAwesomeIcon icon={faXmark} onClick={handleCancelClick} />
          </button>
        </div>
      </ItemBox>
    );
  } else {
    // 편집,등록완료
    return (
      <ItemBox onClick={handleEditClick}>
        <div className="flex justify-between">
          <Select
            labelInValue
            value={selecCate}
            style={{
              width: 205,
            }}
            onChange={handleCateChange}
            disabled={true}
            // options={cateList}
          />
          <button className="text-base">
            <FontAwesomeIcon icon={faTrash} onClick={handleRemoveClick} />
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          <Input
            placeholder="구매 목록"
            value={itemName}
            disabled={true}
            onChange={handleItemNameChange}
          />
          <InputNumber
            className="flex-1"
            value={ea}
            disabled={true}
            onChange={handleEaChange}
          />
          <Select
            className="flex-1"
            disabled={true}
            value={selecUnit}
            onChange={handleUnitChange}
            options={unitList}
          />
        </div>
        <div className="flex justify-around"></div>
      </ItemBox>
    );
  }
};

export default FirstItem;
