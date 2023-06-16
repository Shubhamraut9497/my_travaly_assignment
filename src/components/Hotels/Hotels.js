import React from "react";
import Header from "../Navbar/Header";
import "./Hotel.css";
import List from '../List/List'
function Hotels() {
  return (
    <>
      <div className="header2">
        <Header />
      </div>
      <div>
        <List />
      </div>
    </>
  );
}

export default Hotels;
