import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";

const AdminAdminEntry = ({ admin }) => {
  return (
    <tr>
      <td className='text-xs px-3 py-1 border-gray-300 border-b border-t md:text-base md:px-5 md:py-2'>
        {String(admin._id).slice(0, 8) + "..."}
      </td>
      <td className='text-xs px-3 py-1 border-gray-300 border-b border-t md:text-base md:px-5 md:py-2'>
        {admin.role}
      </td>
      <td className='text-xs px-3 py-1 border-gray-300 border-b border-t md:text-base md:px-5 md:py-2'>
        {admin.username}
      </td>
      <td className='text-xs px-3 py-1 border-gray-300 border-b border-t md:text-base md:px-5 md:py-2'>
        {admin.password}
      </td>
      <td className='text-xs px-3 py-1 border-gray-300 border-b border-t md:text-base md:px-5 md:py-2'>
        <div className='flex  items-center space-x-2'>
          <MdEdit className='text-gray-600' />
          <MdDelete className='text-red-500' />
        </div>
      </td>
    </tr>
  );
};

export default AdminAdminEntry;
