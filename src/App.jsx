import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Trending from './components/Trending'
import Popular from './components/popular'
import Movie from './components/Movie'
import TvShows from './components/TvShows'
import People from './components/People'

const App = () => {
  return (
    <div className=' bg-[#1F1E24] flex w-screen h-screen'>

<Routes>
  
  <Route path='/' element={<HomePage />} />
  <Route path='/trending' element={<Trending />} />
  <Route path='/popular' element={<Popular />} />
  <Route path='/movie' element={<Movie />} />
  <Route path='/tvshows' element={<TvShows />} />
  <Route path='/person' element={<People />} />
  
</Routes>

    </div>
  )
}

export default App