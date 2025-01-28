import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { asyncloadmovie, removemovie } from '../store/actions/movieActions'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return () => {
      // cleanup
      dispatch(removemovie())
    }
  },[]);

 
  return (
    <div className='text-white'>Moviedetailss</div>
  )
}

export default MovieDetails