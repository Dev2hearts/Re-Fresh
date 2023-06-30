import React from "react";
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
  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };
  // 목록창 클릭시 모달창
  const handleClick = () => {
    console.log("클릭");
  };
  const handleDeleteClick = e => {
    console.log("삭제클릭");
    // 이벤트 전달 안 하기 
    e.stopPropagation();
  };
  return (
    <ItemWrap onClick={handleClick}>
      <Checkbox onChange={onChange} value={item.finishYn}></Checkbox>
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
