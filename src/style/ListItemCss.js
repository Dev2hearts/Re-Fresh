import styled from "@emotion/styled";

export const ItemWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
  /* width: calc(100 / 5); */
`;
export const ItemListCate = styled.span`
  width: 15%;
`;

export const ItemListName = styled.span`
  width: 50%;
  text-align: center;
`;
export const ItemListUnit = styled.span`
  width: 30%;
  em {
    font-style: normal;
    color: #000;
    margin-left: 5px;
  }
`;
export const ItemDelete = styled.button`
  /* position: absolute; */
  right: 70%;
  cursor: pointer;
  padding: 10px;
`;
export const ItemUser = styled.span``;
