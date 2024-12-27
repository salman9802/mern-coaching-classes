import React from "react";
import NavBar from "./NavBar";
import logo from "./../assets/logo.jpg";

const Header = () => {
  return (
    <>
      <div className='w-screen pt-5 md:pt-10 lg:pt-12'></div>
      <header className='pt-2 p-6 sticky top-0 z-50 bg-white w-11/12 mx-auto  flex flex-row justify-between items-center border-b border-b-gray-300 md:p-8'>
        <div className='flex items-center space-x-3 text-primary-500 font-semibold'>
          <img className='w-10 h-10 md:w-11 md:h-11' src={logo} alt='Logo' />
          <span className='text-xl md:text-3xl'>Rathod Coaching Classes</span>
        </div>
        <NavBar />
      </header>
    </>
  );
};

export default Header;
