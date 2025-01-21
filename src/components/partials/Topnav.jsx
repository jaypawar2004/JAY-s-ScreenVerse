import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Topnav = () => {
    const [query, setquery] = useState("")
    
    console.log(query);
    
  return (
    <div className='w-full h-[10vh] relative flex justify-start items-center ml-[15%]'>
<i class=" text-zinc-400 text-xl ri-search-line"></i>

<input 
onChange={(e) =>
    setquery(e.target.value)}
value={query}
className='w-[50%] mx-10 p-6 text-xl outline-none border-none bg-transparent text-zinc-200' 
type="text" 
placeholder='search' />
{query.length > 0 && (
    
<i onClick={() => setquery("")} class="text-zinc-400 text-xl ri-close-circle-line"></i>
    )}
   
   <div className="w-[50%] max-h-[50vh] absolute bg-zinc-200 top-[90%] overflow-auto rounded">
    {/* <Link className='hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-5 flex items-center justify-start border-zinc-100 border-b-2'>
    <img src="" alt="" />
    <p>hello dosto</p>
    </Link>
    */}
   </div>
   
    </div>
  )
}

export default Topnav