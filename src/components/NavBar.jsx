import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./../assets/logo.jpg";

const NavBar = () => {
  const linkClasses = ({ isActive }) => {
    return (
      "border border-blue-300 px-3 py-1 rounded-md " +
      (isActive
        ? "bg-blue-500 text-white hover:bg-white hover:text-blue-500"
        : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white")
    );
  };

  return (
    <nav className='p-6 w-full flex flex-row justify-between items-center border-b border-b-gray-300'>
      <div className='flex space-x-3 text-3xl text-blue-500 font-semibold'>
        <img className='w-11 h-w-11' src={logo} alt='Logo' />
        <span>Rathod Coaching Classes</span>
      </div>
      <div className='flex justify-center items-center space-x-3'>
        <NavLink to='/' className={linkClasses}>
          Home
        </NavLink>
        <NavLink to='/about' className={linkClasses}>
          About
        </NavLink>
        <NavLink to='/contact' className={linkClasses}>
          Contact
        </NavLink>
        <NavLink to='/free-resources' className={linkClasses}>
          Free Resources
        </NavLink>
        <NavLink to='/courses' className={linkClasses}>
          Courses
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
