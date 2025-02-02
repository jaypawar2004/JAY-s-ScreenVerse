import React from 'react'
import { Link } from 'react-router-dom';
import noimage from '/noimage.jpg';

const HorizontalCards = ({data}) => {
  return  (
        
    <div className='w-[100%] flex overflow-y-hidden mb-5 p-5'>
{data.length > 0 ? data.map((d, i) => (

    <Link to={`/${d.media_type}/details/${d.id}`} key={i} 
    className='min-w-[20%] h-[45vh] mr-5 mb-5 bg-zinc-900'>

        <img className='w-full h-[55%] object-cover' 
        src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original${
      d.backdrop_path || d.poster_path}`:noimage} alt="" />

<div className='text-white p-2 h-[55%]'>

      <h1 className=' text-lg font-semibold'>
      {d.name || d.original_name || d.original_title}</h1>

    <p className=' mt-3'>{d.overview.slice(0, 50)}... 
      <span className='text-zinc-500'>more
    </span>
    </p>

</div>
    </Link>
       
       )): <h1 className='text-white font-black'>Nothing to show</h1>}

    </div>
  );
}

export default HorizontalCards