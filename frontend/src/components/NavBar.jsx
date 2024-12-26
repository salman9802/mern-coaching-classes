import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const linkClasses = ({ isActive }) => {
    return (
      "border border-primary-200 px-3 py-1 rounded-md " +
      (isActive
        ? "bg-primary-500 text-white hover:bg-white hover:text-primary-500"
        : "bg-white text-primary-500 hover:bg-primary-500 hover:text-white")
    );
  };

  return (
    <nav className='flex justify-center items-center space-x-3'>
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
    </nav>
  );
};

export default NavBar;
