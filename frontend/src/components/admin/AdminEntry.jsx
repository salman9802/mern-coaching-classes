import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";

const AdminAdminEntry = ({ admin, handleAdminDelete }) => {
  return (
    <tr>
      <td className='text-xs px-3 py-1 border-gray-300 border-b border-t md:text-base md:px-5 md:py-2'>
        {String(admin._id).slice(0, 8) + "..."}
      </td>
      <td className='text-xs px-3 py-1 border-gray-300 border-b border-t md:text-base md:px-5 md:py-2'>
        {admin.type}
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
          <MdDelete
            onClick={(e) => {
              handleAdminDelete(admin._id);
            }}
            className='text-red-500'
          />
        </div>
      </td>
    </tr>
  );
};

export default AdminAdminEntry;
