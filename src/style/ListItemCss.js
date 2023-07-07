import styled from "@emotion/styled";

export const ItemWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  height: 70px;
  margin-bottom: 20px;
  padding: 10px;
`;
export const ItemListCate = styled.span`
  width: 20%;
`;
export const ItemListName = styled.span`
  width: 30%;
`;
export const ItemListUnit = styled.span`
  em {
    font-style: normal;
    color: #000;
    margin-left: 5px;
  }
`;
export const ItemDelete = styled.button`
  position: absolute;
  right: 70px;
  cursor: pointer;
  padding: 10px;
`;
export const ItemUser = styled.span``;
