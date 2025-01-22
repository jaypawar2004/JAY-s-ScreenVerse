import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import axios from '../utils/axios'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/Dropdown'
import Loading from './Loading'

const HomePage = () => {
  const [wallpaper, setwallpaper] = useState(null)
  const [trending, settrending] = useState(null)
  const [category, setcategory] = useState('all')
  const GetHeaderWallpaper = async() => {
    try{
      const {data} = await axios.get('/trending/all/day')
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    }catch(error){
      console.log("Error",error);
    }
  }
  const GetTrending = async() => {
    try{
      const {data} = await axios.get(`/trending/${category}/day`)
      // let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      settrending(data.results);
    }catch(error){
      console.log("Error",error);
    }
  }
  // console.log(wallpaper)
  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);


  // console.log(trending)
  return wallpaper && trending ? (
    document.title = 'JAY | HomePage',
    <>
    <Sidenav />
    <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
    <Topnav />
<Header data={wallpaper}/>
<div className='mb-5 flex justify-between p-5'>

        <h1 className='text-2xl font-semibold text-zinc-400'>Trending</h1>
        <Dropdown 
        title="Filter" 
        options={["tv", "movie","all"]}
        func={(e)=> setcategory(e.target.value)} />
        </div>
<HorizontalCards  data={trending} />
    </div>
    </>
  ):(
 <Loading />
  )  
}

export default HomePage