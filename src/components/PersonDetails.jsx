import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson } from "../store/actions/personAction";
import { removeperson } from "../store/actions/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      // cleanup
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-[15%] w-screen flex flex-col">
      {/* part 1 navigation */}
      <nav className=" h-[10vh] w-full text-zinc-200 flex items-center text-xl gap-10 ">
            <Link
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-long-line"
            ></Link>
         
          </nav>
          <div className="w-full flex flex-col">
          {/* part 2 left poster and details */}
<div className="w-[20%]"> 
<img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[45vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.profile_path 
          }`}
          alt=""
        />
      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
{/* Socail midea Link */}
<div className="text-xl text-white flex gap-x-5">
    
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}
            >
              <i className="ri-earth-fill"></i>
            </a>
           
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
            >
             <i class="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
            >
    <i class="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.x.com/${info.externalid.twitter_id}/`}
            >
    <i class="ri-twitter-x-fill"></i>
            </a>
           
</div>
{/* Personal info */}
<h1 className="text-zinc-300 font-semibold text-2xl">Personal info</h1>
</div>

{/* part 3 details and info */}
<div className="w-[80%]"></div>
          </div>
    </div>
  ) : <Loading />
  
};

export default PersonDetails;
