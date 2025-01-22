import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import axios from '../utils/axios'
import { use } from 'react'
import Cards from './partials/Cards'
import Loading from './Loading'

const Trending = () => {
    const navigate = useNavigate()

    const [category, setcategory] = useState("all")
    const [duration, setduration] = useState("day")
    const [trending, settrending] = useState([])

    const GetTrending = async() => {
        try{
          const {data} = await axios.get(`/trending/${category}/${duration}`)
          // let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
          settrending(data.results);
        }catch(error){
          console.log("Error",error);
        }
      }
      useEffect(() => {
        GetTrending();
      },[category, duration]);
  return trending ? (
    <div className='px-[3%] w-screen h-screen overflow-hidden overflow-y-auto'>

        <div className='w-full items-center flex justify-between'>
          
            <h1 className=' text-xl font-semibold text-zinc-400'>
            <i 
            onClick={() =>navigate(-1)}
             className="hover:text-[#6556CD] ri-arrow-left-long-line"></i>
               Trending
                </h1>
<div className='w-[100%] flex items-center'>

                <Topnav />
                <Dropdown 
                title="Category" 
                options={["movie", "tv","all"]} 
                func= {(e) => setcategory(e.target.value)} />
                <div className='w-[1%]'></div>
                <Dropdown 
                title="Duration" 
                options={["week", "day",]} 
                func= {(e) => setduration(e.target.value)} />

</div>
        </div>

<Cards data={trending} title={category} />
    </div>
  ):
    <Loading />
  
};


export default Trending