import React from 'react';
import logo from "../assets/navbar-nasdaily.png";
import "./Navigationbar.css";

const Navigationbar = () => {
  return (
    <>
      <div className='navbar'>
            <img src={logo} alt='logo' className='navbar-image' />
      </div>
    </>
  );
};

export default Navigationbar;