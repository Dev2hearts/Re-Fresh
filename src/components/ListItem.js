import React, { useState } from "react";
import {
  ItemDelete,
  ItemListCate,
  ItemListName,
  ItemListUnit,
  ItemUser,
  ItemWrap,
} from "../style/ListItemCss";
import { Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const ListItem = ({ item }) => {
  const onClick = e => {
    e.stopPropagation();
    console.log(`checked = ${e.target.checked}`);
  };

  const handleDeleteClick = e => {
    console.log("삭제클릭");
    // 이벤트 전달 안 하기
    e.stopPropagation();
  };

  return (
    <ItemWrap>
      <Checkbox
        onClick={onClick}
        value={item.finishYn}
        defaultChecked={item.completed}
      ></Checkbox>
      <ItemListCate>{item.icate}</ItemListCate>
      <ItemListName>{item.nm}</ItemListName>
      <ItemListUnit>
        {item.cnt}
        <em>{item.iunit}</em>
      </ItemListUnit>
      <ItemDelete onClick={handleDeleteClick}>
        <FontAwesomeIcon icon={faTrash} />
      </ItemDelete>
      <ItemUser>{item.wiuser}</ItemUser>
    </ItemWrap>
  );
};

export default ListItem;
