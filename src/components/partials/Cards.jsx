import React from 'react'
import { Link } from 'react-router-dom';

const Cards = ({data, title}) => {
  return (
    <div className=' flex flex-wrap w-full  gap-5'>
{data.map((c,i)=>(
<Link 

key={i} className='w-[25vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] mb-5 mr-5'>
    <img className='h-[40vh]' src={`https://image.tmdb.org/t/p/original/${
      c.poster_path || c.backdrop_path}
    `} alt="" />
    <h1 className='text-zinc-200 font-semibold text-lg mt-3'>

     {c.name || c.title || c.original_name || c.original_title}
    </h1>
</Link>
))}
    </div>
  )
}

export default Cards;