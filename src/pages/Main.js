import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Schedule from "../components/Schedule"
import { MainWrap } from "../style/MainCss";


const Main = () => {
  return (
    <MainWrap>
      <Header />
      <div>
        <Schedule />
      </div>
      <Footer />
    </MainWrap>
  );
};

export default Main;
