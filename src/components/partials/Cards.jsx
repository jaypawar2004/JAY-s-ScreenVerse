import React from 'react'
import { Link } from 'react-router-dom';
import noimage from '/noimage.jpg'


const Cards = ({data, title}) => {
  console.log(data, title)
  return (
    <div className=' flex flex-wrap w-full h-full bg-[#1F1E24] px-[5%] gap-5'>
{data.map((c, i)=>(
<Link 
to={`/${c.media_type || c.title}/details/${c.id}`}
key={i}
 className='relative w-[30vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] mb-5 mr-5'>
  
    <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[60vh] object-cover' src={
     c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${
      c.poster_path || c.backdrop_path || c.profile_path}

    `:noimage} alt="" />
    
    <h1 className='text-zinc-200 font-semibold text-lg mt-3'>

     {c.name || c.title || c.original_name || c.original_title}
    </h1>
    {c.vote_average && (
    
    <div 
    className='absolute right-[-10%] bottom-[20%] text-white font-semibold rounded-full text-center flex items-center justify-center bg-red-800 w-[7vh] h-[7vh]'>
      {(c.vote_average * 10 ).toFixed()} <sup>%</sup>
</div>
   )}
</Link>
))}
    </div>
  )
}

export default Cards;