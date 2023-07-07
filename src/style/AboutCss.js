import styled from "@emotion/styled";

export const BackDiv = styled.div`
  max-height: 50px;
  max-width: 50px;
  text-align: center;
  font-size: 25px;
`;
export const Header = styled.header`
  background: #F9F6F1;
  width: 100%;
  height: 35%;
  min-height: 292px;
`;
export const HeaderUser = styled.div`
  flex-direction: column;
  text-align: center;
`;
export const Imgdiv = styled.div`
  width: 25%;
  height: 25%;
  border-radius: 20%;
  border: 2px solid rgb(0, 97, 39);
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
  font-weight: 700;
  color: #006127;
`;
export const TitleUser = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #333333;
`
export const SubTitle = styled.h1`
  font-size: 25px;
  font-weight: 500;
  color: #333333;
  span {
    color: #006127;
  }
`;
export const UserNmBirth = styled.p`
  font-size: 20px;
  span {
    color: #006127;
    font-weight: 500;
  }
`;
export const Userlist = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5%;
  padding: 3% 5% 0;
`;
export const Grouplist = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  gap: 2%;
  margin-bottom: 4%;
  li {
    font-size: 20px;
  }
`;
export const UserLi = styled.li`
  width: calc((100% - 30%) / 3);
  text-align: center;

  span {
    color: #305569;
    font-size: 16px;
    font-weight: 500;
  }
`;
export const UserImgdiv = styled.div`
  width: 100%;
  height: auto;
  border-radius: 20%;
  border: 2px solid rgb(0, 97, 39);
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
