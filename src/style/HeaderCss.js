import styled from "@emotion/styled";

export const Wrap = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 40px;
  align-items: center;
  background: #f9f6f1;
  font-size: 14px;
  border-radius: 0 0 3px 3px;
  a {
    color: #006127;
    font-weight: 400;
  }
`;
export const Imgdiv = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 25%;
  background: #fff;
  overflow: hidden;
  text-align: center;
  position: relative;

  ::after {
    padding-bottom: 100%;
    content: "";
    display: block;
  }

  img {
    position: absolute;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
  }
`;
export const UIDdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    padding: 0 5px;
  }
`;
