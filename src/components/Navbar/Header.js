import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
//  import Button from 'react-bootstrap/Button';
//  import { Avatar } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header" id="scrollTarget">
      <div className="header__left">
        <h1>
          <img
            src="https://mytravaly.com/logo.png"
            alt="logo"
            className="img"
          />
        </h1>
      </div>
      <div className="header__right">
        <div className="content">
          <Link
            to="https://mytravaly.com/"
            style={{ textDecoration: "none", color: "white" }}
          >
            Know More
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Header;
