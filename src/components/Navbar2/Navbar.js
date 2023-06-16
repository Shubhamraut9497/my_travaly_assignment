import React from "react";
import "./Navbar.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { BiBed } from "react-icons/bi";
 import { TbPlaneInflight } from "react-icons/tb";
 import SearchBar from '../searchbar/SearchBar'

function Navbar(type) {

   const navigate=useNavigate();
  const icons = (icon, text) => {
    return (
      <div className="icon">
        <span className="para">{icon}</span>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <>
      <div className="navbar">
        <div className="navbarContainer">
        <div className="NavbarList">
          <div className="navbarList__item">
            <span className="stays">{icons(<BiBed />, "Stays")}</span>
            <span onClick={() => navigate("/flights")}>
              {icons(<TbPlaneInflight />, "Flights")}
            </span>
          </div>
          </div>
        </div>
        {type !== "list" && (
          <>
            <div className="text">
              <h1>Ski the Swiss Alps this winter</h1>
              <h3>
                Discover Switzerland's best ski resort and plan the perfect
                vacation
              </h3>
              <Button type="submit" className="bt" variant="primary">
                Explore
              </Button>
            </div>

          </>
        )}
      </div>
      <SearchBar/>
    </>
  );
}

export default Navbar;
