import axios from '../utils/axios';
// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Dropdown from './partials/Dropdown';
import Topnav from './partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

const Populer = () => {
  
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [duration, setduration] = useState("day");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "JAY | Populer" + category.toUpperCase();

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      // let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      // setpopular(data.results);
     if(data.results.length > 0 ){
       setpopular((prev) => [...prev, ...data.results]);
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
    if(popular.length === 0){
      GetPopular()
    }else{  
      setpage(1);
       setpopular([]);
       GetPopular();
    }
  }
  useEffect(() => {
    refreshHandler()
  }, [category]);
  return popular.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full items-center flex justify-between px-[5vw]">
        <h1 className=" text-xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-long-line"
          ></i>
          Populer
        </h1>
        <div className="w-[100%] flex items-center">
          <Topnav />
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[1%]"></div>
         
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1 className="text-white">Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Populer