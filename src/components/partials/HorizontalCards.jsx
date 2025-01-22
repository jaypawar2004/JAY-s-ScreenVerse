import React from 'react'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const HorizontalCards = ({data , func}) => {
  return (
        
    <div className='w-[100%] flex overflow-y-hidden overflow-x-auto'>
{data.map((d, i) => (

    <div key={i} className='min-w-[20%] mr-5 mb-5 bg-zinc-900'>

        <img className='w-full h-[45%] object-cover' 
        src={`https://image.tmdb.org/t/p/original${
      d.backdrop_path || d.poster_path}`} alt="" />

<div className='text-white p-2 h-[55%]'>

      <h1 className=' text-lg font-semibold'>
      {d.name || d.original_name || d.original_title}</h1>

    <p className=' mt-3'>{d.overview.slice(0, 100)}... 
      <span className='text-zinc-500'>more
    </span>
    </p>

</div>
    </div>
       
       ))}

    </div>
  );
}

export default HorizontalCards