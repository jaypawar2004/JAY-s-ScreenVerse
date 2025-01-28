export { removemovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";


export const asyncloadmovie = (id) => async(dispatch, getState)=>{
  try {
  const detail = await axios.get(`/movie/${id}`);
  const externalid = await axios.get(`/movie/${id}/external_ids`);
  const recommendations = await axios.get(`/movie/${id}/recommendations`);
  const similar = await axios.get(`/movie/${id}/similar`);
  const videos = await axios.get(`/movie/${id}/videos`);
  const watchprovider = await axios.get(`/movie/${id}/watch/providers`);
 
  let thedetail = {
    detail: detail.data,
    externalid: externalid.data,
    recommendations: recommendations.data.results,
    similar: similar.data.results,
    videos: videos.data.results.find(video => video.site === "movie" && video.type === "Trailer") || videos.data.results[0],
    watchprovider: watchprovider.data.results.IN
    };
dispatch(loadmovie(thedetail));

    console.log(thedetail)
  } catch (error) {
    console.log("Error : ",error);
  }
}