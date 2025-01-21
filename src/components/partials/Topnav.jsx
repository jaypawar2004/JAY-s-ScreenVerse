import axios from '../../utils/axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noimage.jpg'

const Topnav = () => {
  
    const [query, setquery] = useState("")
    const [searches, setsearches] = useState([])
    const GetSerches = async() => {
      try{
        const {data} = await axios.get(`/search/multi?query=${query}`)
     setsearches(data.results)
      }catch(error){
      console.log("Error",error);
      
      }
        };
      
        useEffect(() => {
      GetSerches();
        },[query]);
      
    
    
  return (
    <div className='w-full h-[10vh] relative flex justify-start items-center ml-[15%]'>
<i className=" text-zinc-400 text-xl ri-search-line"></i>

<input 
onChange={(e) =>
    setquery(e.target.value)}
value={query}
className='w-[50%] mx-10 p-6 text-xl outline-none border-none bg-transparent text-zinc-200' 
type="text" 
placeholder='search' />
{query.length > 0 && (
    
<i onClick={() => setquery("")}
 className="text-zinc-400 text-xl ri-close-circle-line"></i>
    )}
   
   <div className="w-[50%] max-h-[50vh] absolute bg-zinc-200 top-[90%] overflow-auto rounded">
   {searches.map((s, i) => (
        
    <Link
     key={i}
      className='hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-5 flex items-center justify-start border-zinc-100 border-b-2'>
    <img
    className='w-[10vh] h-[10vh] object-cover mr-5 rounded shadow-md'
     src={
      s.backdrop_path || 
      s.profile_path ?`https://image.tmdb.org/t/p/original/${
      s.backdrop_path || s.profile_path}`: noimage} alt="" />
    <span>{s.name ||s.original_name || s.original_title}</span>
    </Link>
   
   ))}


   </div>
   
    </div>
  )
}

export default Topnav