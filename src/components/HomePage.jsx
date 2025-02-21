import { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import axios from '../utils/axios'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/Dropdown'
import Loading from './Loading'

const HomePage = () => {
  const [wallpaper, setWallpaper] = useState(null)
  const [trending, setTrending] = useState(null)
  const [category, setCategory] = useState('all')

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get('/trending/all/day')
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()]
      setWallpaper(randomdata)
    } catch (error) {
      console.log("Error", error)
    }
  }

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`)
      setTrending(data.results)
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    GetTrending()
    !wallpaper && GetHeaderWallpaper()
  }, [category])

  return wallpaper && trending ? (
    document.title = 'JAY | HomePage',
    <>
      <Sidenav />
      <div className='w-full lg:w-[80%] h-full overflow-auto overflow-x-hidden '>
        <Topnav />
        <Header data={wallpaper} />
        
        <div className='mb-5 flex flex-col sm:flex-row justify-between p-3 sm:p-5'>
          <h1 className='text-lg sm:text-xl md:text-2xl font-semibold text-zinc-400 mb-3 sm:mb-0'>
            Trending
          </h1>
          <div className='w-full sm:w-48'>
            <Dropdown 
              title="Filter" 
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)} 
            />
          </div>
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default HomePage