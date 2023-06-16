import React from 'react'
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//  import Button from 'react-bootstrap/Button';
//  import { Avatar } from '@mui/material';
 import { useNavigate } from 'react-router-dom';

const Header=()=>{
  const navigate=useNavigate();
  return (
    <div className="header">
        <div className="header__left">
            <h1><img src="https://mytravaly.com/logo.png" alt='logo' className='img'/></h1>
        </div>
        <div className="header__right">
            <button type="submit" className="bst" onClick={()=>navigate("/register")}>Register</button>
            <button type="submit" className="bst"onClick={()=>navigate("/login")}>Login</button>
        </div>
    </div>
  )
}

export default Header;