import React from "react";

const AdminContactEntry = ({ contact, checks, index, handleChecks }) => {
  return (
    <tr>
      <td className='px-5 py-2 border-gray-300 border-b border-t'>
        <input
          // style={{
          //   // accentColor: "#eab308",
          //   accentColor: "#a855f7",
          // }}
          className='accent-purple-500'
          onChange={(e) => handleChecks(index, e.target.checked)}
          checked={checks[index]}
          type='checkbox'
          name='chk'
        />
      </td>
      <td className='px-5 py-2 border-gray-300 border-b border-t'>
        {contact.name}
      </td>
      <td className='px-5 py-2 border-gray-300 border-b border-t'>
        {contact.mobile}
      </td>
      <td className='px-5 py-2 border-gray-300 border-b border-t'>
        {contact.city}
      </td>
      <td className='px-5 py-2 border-gray-300 border-b border-t'>
        {contact.educationClass}
      </td>
    </tr>
  );
};

export default AdminContactEntry;
