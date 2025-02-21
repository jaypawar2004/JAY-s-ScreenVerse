// import React from 'react'

// const Dropdown = ({title, options, func}) => {
//   return (
//     <div className='select'>
//         <select defaultValue='0' onChange={func} name="format" id="format">
//             <option value="0" disabled>
//               {title}
//             </option>
//             {options.map((o, i) => 
//             <option
//             key={i}
//             value={o} >
//               {o.toUpperCase()}
//             </option> )}
//         </select>
//     </div>
//   )
// }

// export default Dropdown

import React from 'react';

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="select w-full sm:w-auto">
      <select
        defaultValue="0"
        onChange={func}
        name="format"
        id="format"
        className="w-full md:w-[180px] bg-gray-800 text-white text-sm sm:text-base md:text-lg 
          border border-zinc-600 rounded-md p-2 sm:p-3 
          focus:outline-none focus:ring-2 focus:ring-[#6556CD] 
          appearance-none cursor-pointer"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option
            key={i}
            value={o}
            className="text-sm sm:text-base md:text-lg bg-gray-800"
          >
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;