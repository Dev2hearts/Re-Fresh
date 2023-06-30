import React, { useEffect } from "react";
import { useState } from "react";
import { ItemBox } from "../style/FirstItemCss";
import { InputNumber, Input, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { getCate, getUnit } from "../api/fetch";

// 추가 코드 item
const FirstItem = ({ onDelete, index, item }) => {
  const [cateList, setCateList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [selecCate, setSelecCate] = useState(null);

  // 추가 코드 : Select 의 value 값
  const [selectValue, setSelectValue] = useState(null);

  const [itemName, setItemName] = useState();
  const [selecUnit, setSelecUnit] = useState(null);
  const [ea, setEa] = useState();
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
    onDelete(index);
  };
  const handleCateChange = value => {
    setSelecCate(value);
    // 추가코드 사용자가 Selec 에서 값을 선택한 경우
    setSelectValue(cateList[value].label);
  };
  const handleItemNameChange = e => {
    setItemName(e.target.value);
  };
  const handleEaChange = e => {
    setEa(e.target.value);
  };
  const handleUnitChange = value => {
    setSelecUnit(value);
  };

  // 추가한 코드 item 이 넘어온다.
  useEffect(() => {
    // console.log("아이템 넘어옴");
    if (!item.icate) {
      setSelectValue("카테고리");
      setIsEdit(true);
    }
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
    if (isEdit) {
      // 모달 창이 열릴 때마다 데이터를 초기화
      fetchCateData();
      fetchUnitData();
    }
  }, [isEdit]);

  if (isEdit) {
    // 편집중
    return (
      <ItemBox>
        <div className="flex justify-between">
          <Select
            value={selectValue}
            defaultValue="카테고리"
            style={{
              width: 205,
            }}
            onChange={handleCateChange}
            disabled={false}
            options={cateList}
          />
          <button className="text-base">
            <FontAwesomeIcon icon={faTrash} onClick={handleRemoveClick} />
          </button>
        </div>

        <div className="flex flex-wrap gap-1">
          <Input
            placeholder="구매 목록"
            disabled={false}
            onChange={handleItemNameChange}
          />
          <InputNumber
            className="flex-1"
            defaultValue={1}
            disabled={false}
            onChange={handleEaChange}
          />
          <Select
            className="flex-1"
            defaultValue="단위"
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
            defaultValue={item.icate ? "gogo" : "카테고리"}
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
            disabled={true}
            onChange={handleItemNameChange}
          />
          <InputNumber
            className="flex-1"
            defaultValue={1}
            disabled={true}
            onChange={handleEaChange}
          />
          <Select
            className="flex-1"
            disabled={true}
            defaultValue="단위"
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