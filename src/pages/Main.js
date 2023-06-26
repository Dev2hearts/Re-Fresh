import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Calendar from "../components/Calendar";

const Main = () => {
  return (
    <div>
      <Header />
      <div>
        <Calendar />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
