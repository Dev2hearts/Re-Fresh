import styled from "@emotion/styled";

export const Header = styled.header`
  flex-direction: column;
  text-align: center;
  background: #f9f6f1;
  width: 100%;
  height: 40%;
  min-height: 292px;
`;
export const Imgdiv = styled.div`
  width: 25%;
  height: 25%;
  border-radius: 20%;
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
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;
export const Information = styled.div`
  width: 80%;
  margin: 5% auto;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;
export const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;
export const SubTitle = styled.h1`
  font-size: 25px;
  font-weight: 400;
`;
