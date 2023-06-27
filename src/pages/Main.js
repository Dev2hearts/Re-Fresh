import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Schedule from "../components/Schedule";
import ShoppingList from "../components/ShoppingList";


const Main = () => {
  return (
    <div>
      <Header />
      <div>
        <Schedule />
        <ShoppingList />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
