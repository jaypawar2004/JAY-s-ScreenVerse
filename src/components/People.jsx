import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from './partials/Dropdown';
import Topnav from './partials/Topnav';
import Cards from './partials/Cards';

const People = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = "JAY | person";
  
    const GetPerson = async () => {
      try {
        const { data } = await axios.get(`/person/${category}?page=${page}`);
        // let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
        // setperson(data.results);
       if(data.results.length > 0 ){
         setperson((prev) => [...prev, ...data.results]);
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
      if(person.length === 0){
        GetPerson()
      }else{  
        setpage(1);
         setperson([]);
         GetPerson();
      }
    }
    useEffect(() => {
      refreshHandler()
    }, [category]);
  return person.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full items-center flex justify-between px-[5vw]">
        <h1 className="flex items-baseline text-xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-long-line"
          ></i>{" "}
      People <small className='text-sm ml-1 text-zinc-600'>({category})</small>
        </h1>
        <div className="w-[100%] flex items-center">
          <Topnav />
          
          <div className="w-[1%]"></div>
         
        </div>
      </div>
      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1 className="text-white">Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People