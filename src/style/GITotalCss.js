import styled from "@emotion/styled";

export const GIContainer = styled.div`
  position: relative;
  max-width: 720px;
  height: 100vh;
`;

export const GIStyles = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 80%;
  left: 0px;
  top: 0px;
  background: linear-gradient(
    180deg,
    rgba(218, 218, 218, 0.65) 0%,
    rgba(204, 204, 204, 0) 100%
  );
`;

export const GITitle = styled.p`
  font-weight: 700;
  height: auto;
  font-size: 38px;
  padding: 0 0 0.1vw 0;
  line-height: 20px;
  letter-spacing: 3px;
  color: #305569;
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 220px 0 50px;

  @media (max-width: 1100px) {
    font-size: 3.5vw;
  }
  @media (max-width: 920px) {
    font-size: 2rem;
  }
  @media (max-height: 470px) {
    margin-bottom: 0;
  }
  @media (max-height: 412px) {
    margin-top: 60%;
  }
  @media (max-width: 318px) {
    font-size: 1rem;
  }
`;

export const GIUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 0 20%;
  @media (max-width: 191px) {
    padding: 0 5%;
  }
  @media (max-width: 174px) {
    padding: 0;
  }
  @media (max-height: 500px) {
    gap: 5px;
  }
  @media (max-width: 115px) {
    gap: 5px;
  }
  @media (max-height: 470px) {
    gap: 0px;
  }
  @media (max-width: 104px) {
    gap: 0px;
  }
`;

export const GILi = styled.li`
  width: calc((100% - 30px) / 3);
  min-height: 50px;
  min-width: 50px;
  border: 1px solid rgb(0, 97, 39);
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
  }
`;

export const GILogoDiv = styled.div`
  position: absolute;
  padding-bottom: 5vh;
  bottom: 0;
  width: 100%;
`;

export const GILogo = styled.img`
  width: 30%;
  height: auto;
  margin: 0 auto;
  @media (max-width: 300px) {
    width: 70px;
  }
`;
