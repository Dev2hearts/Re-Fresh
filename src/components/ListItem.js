import React from "react";
import { useState } from "react";
import { ItemBox } from "../style/FirstItemCss";
import { InputNumber, Input, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const ListItem = () => {
  const [isEdit, setIsEdit] = useState(true);
  const handleSaveClick = () => {
    setIsEdit(false);
  };
  const handleEditClick = () => {
    setIsEdit(true);
  };
  const handleChange = value => {
    console.log(`Selected: ${value}`);
  };
  const handleCancelClick = () => {
    setIsEdit(false);
  };
  if (isEdit) {
    // 편집중
    return (
      <ItemBox>
        <div>
          <Select
            defaultValue="카테고리"
            style={{
              width: 205,
            }}
            onChange={handleChange}
            disabled={false}
            options={[
              {
                value: "냉동식품",
                label: "냉동식품",
              },
              {
                value: "과일/채소",
                label: "과일/채소",
              },
              {
                value: "유제품",
                label: "유제품",
              },
            ]}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          <Input placeholder="구매 목록" disabled={false} />
          <InputNumber className="flex-1" defaultValue={1} disabled={false} />
          <Select
            className="flex-1"
            defaultValue="단위"
            onChange={handleChange}
            options={[
              {
                value: "ea",
                label: "ea",
              },
              {
                value: "kg",
                label: "kg",
              },
              {
                value: "g",
                label: "g",
              },
            ]}
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
            defaultValue="카테고리"
            style={{
              width: 205,
            }}
            onChange={handleChange}
            disabled={true}
            options={[
              {
                value: "냉동식품",
                label: "냉동식품",
              },
              {
                value: "과일/채소",
                label: "과일/채소",
              },
              {
                value: "유제품",
                label: "유제품",
              },
            ]}
          />
          <button className="text-base">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          <Input placeholder="구매 목록" disabled={true} />
          <InputNumber
            className="flex-1"
            defaultValue={1}
            style={{ width: 70 }}
            disabled={true}
          />
          <Select
            className="flex-1"
            disabled={true}
            defaultValue="단위"
            onChange={handleChange}
            options={[
              {
                value: "ea",
                label: "ea",
              },
              {
                value: "kg",
                label: "kg",
              },
              {
                value: "g",
                label: "g",
              },
            ]}
          />
        </div>
        <div className="flex justify-around"></div>
      </ItemBox>
    );
  }
};

export default ListItem;
