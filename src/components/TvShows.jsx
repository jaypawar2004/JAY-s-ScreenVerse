import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from './partials/Dropdown';
import Topnav from './partials/Topnav';
import Cards from './partials/Cards';

const TvShows = () => {

    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today");
    const [tvshow, settvshow] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = "JAY | tvshow";
  
    const GetTvshow = async () => {
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
        // let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
        // settvshow(data.results);
       if(data.results.length > 0 ){
         settvshow((prev) => [...prev, ...data.results]);
         setpage(page + 1);
         console.log(data);
  }else{
  sethasMore(false)
  }
  
      } catch (error) {
        console.log("Error", error);
      }
    };
    const refreshHandler = () => {
      if(tvshow.length === 0){
        GetTvshow()
      }else{  
        setpage(1);
         settvshow([]);
         GetTvshow();
      }
    }
    useEffect(() => {
      refreshHandler()
    }, [category]);
  return tvshow.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full items-center flex justify-between px-[5vw]">
        <h1 className="flex items-baseline text-xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-long-line"
          ></i>{" "}
      tvshow <small className='text-sm ml-1 text-zinc-600'>({category})</small>
        </h1>
      </div>
        <div className="w-[100%] flex items-center">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "airing_today", "popular" , "top_rated"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[1%]"></div>
         
        </div>
      <InfiniteScroll
        dataLength={tvshow.length}
        next={GetTvshow}
        hasMore={hasMore}
        loader={<h1 className="text-white">Loading...</h1>}
      >
        <Cards data={tvshow} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default TvShows