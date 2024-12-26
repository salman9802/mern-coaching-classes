import React from "react";
import NavBar from "./NavBar";
import logo from "./../assets/logo.jpg";

const Header = () => {
  return (
    <header className='p-6 w-full flex flex-row justify-between items-center border-b border-b-gray-300'>
      <div className='flex space-x-3 text-3xl text-primary-500 font-semibold'>
        <img className='w-11 h-w-11' src={logo} alt='Logo' />
        <span>Rathod Coaching Classes</span>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
