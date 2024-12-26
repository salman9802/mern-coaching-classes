import React from "react";
import NavBar from "./NavBar";
import logo from "./../assets/logo.jpg";

const Header = () => {
  return (
    <header className='p-6 pt-11 w-11/12 mx-auto sticky top-0 flex flex-row justify-between items-center border-b border-b-gray-300'>
      <div className='flex items-center space-x-3 text-primary-500 font-semibold'>
        <img className='w-10 h-10 md:w-11 md:h-11' src={logo} alt='Logo' />
        <span className='text-xl md:text-3xl'>Rathod Coaching Classes</span>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
