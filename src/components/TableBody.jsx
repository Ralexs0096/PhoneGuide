import React from 'react'

const TableBody = ({ ext, user, position, dept, state }) => {
  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap text-center">{user}</p>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap text-center">
            {position}
          </p>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap text-center">{dept}</p>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap text-center">{ext}</p>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">{state ? 'Activo' : ''}</span>
          </span>
        </td>
      </tr>
    </>
  )
}

export default TableBody
