import styled from "@emotion/styled";

export const GIContainer = styled.div`
  position: relative;
  width: 720px;
  height: 1050px;
`;

export const GIStyles = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 720px;
  height: 80%;
  left: 0px;
  top: 0px;
  background: linear-gradient(
    180deg,
    rgba(106, 189, 0, 0.65) 0%,
    rgba(106, 189, 0, 0) 100%
  );
`;
export const GITitle = styled.p`
  font-weight: 700;
  font-size: 30px;
  line-height: 20px;
  letter-spacing: 3px;
  color: #305569;
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 30% 0 10%;
`;
export const GIUl = styled.ul`
  display: grid;
  grid-template-columns: 125px 125px 125px;
  grid-template-rows: 125px 125px;
  grid-gap: 20px;
  justify-content: center;
  width: auto;
`;
export const GILi = styled.li`
  width: 125px;
  height: 125px;
  border-radius: 20%;
  background: #fff;
  overflow: hidden;
  text-align: center;
`;
export const GILogoDiv = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;
`;
export const GILogo = styled.img`
  width: 25%;
  height: auto;
  margin: 0 auto;
`;
