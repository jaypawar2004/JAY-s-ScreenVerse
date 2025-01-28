import axios from '../utils/axios';
// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Dropdown from './partials/Dropdown';
import Topnav from './partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

const Movie = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = "JAY | Movie";
  
    const GetMovie = async () => {
      try {
        const { data } = await axios.get(`/movie/${category}?page=${page}`);
        // let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
        // setmovie(data.results);
       if(data.results.length > 0 ){
         setmovie((prev) => [...prev, ...data.results]);
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
      if(movie.length === 0){
        GetMovie()
      }else{  
        setpage(1);
         setmovie([]);
         GetMovie();
      }
    }
    useEffect(() => {
      refreshHandler()
    }, [category]);
  return movie.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full items-center flex justify-between px-[5vw]">
        <h1 className="flex items-baseline text-xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-long-line"
          ></i>{" "}
      Movie <small className='text-sm ml-1 text-zinc-600'>({category})</small>
        </h1>
        <div className="w-[100%] flex items-center">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming" , "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[1%]"></div>
         
        </div>
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1 className="text-white">Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movie