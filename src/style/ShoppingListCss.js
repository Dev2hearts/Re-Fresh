import styled from "@emotion/styled";

export const ShoppingWrap = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  border: 5px solid red;
  z-index: 1000;
  transition: top 0.5s;
  background: #f9f6f1;
  height: 700px;
  border-radius: 15px 15px 0 0;
  width: 100%;
  &.shopping-list-open {
    top: 475px;
  }
  &.shopping-list-close {
    top: 100%;
  }
  .listOpen {
    display: flex;
    justify-content: center;
    height: 20px;
    img {
      height: 100%;
      margin-top: 10px;
    }
  }
`;
export const ShoppingDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f9f6f1;
  transition: top 0.5s;
  &.shopping-div-top {
    top: -475px;
  }
  &.shopping-div-middle {
    top: 0;
  }
`;
