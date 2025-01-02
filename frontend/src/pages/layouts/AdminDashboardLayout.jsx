import React from "react";
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className='w-screen flex'>
      <div className='w-1/3 bg-blue-500'>AdminDashboardLayout</div>
      <div className='w-2/3 bg-red-500'>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
