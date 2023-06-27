import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Schedule from "../components/Schedule"


const Main = () => {
  return (
    <div>
      <Header />
      <div>
        <Schedule />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
