import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import TvShows from './components/TvShows'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import PersonDetails from './components/PersonDetails'
import TvDetails from './components/TvDetails'
import Trailer from './components/partials/Trailer'
import NotFound from './components/NotFound'
import About from './components/About'
import ContactUs from './components/ContactUs'

const App = () => {
  return (
    <div className=' bg-[#1F1E24] flex w-screen h-screen'>

<Routes> 
  
  <Route path='/' element={<HomePage />} />
  <Route path='/trending' element={<Trending />} />
  <Route path='/popular' element={<Popular />} />
  <Route path='/about' element={<About />} />
  <Route path='/contact' element={<ContactUs />} />
  
  <Route path='/movie' element={<Movie />} /> 
  <Route path='/movie/details/:id' element={<MovieDetails />}>
  <Route path='/movie/details/:id/trailer' element={<Trailer />} />
  </Route>
 
  
  <Route path='/tv' element={<TvShows />} />
  <Route path='/tv/details/:id' element={<TvDetails />}>
  <Route path='/tv/details/:id/trailer' element={<Trailer />} />
  </Route>
 

  <Route path='/person' element={<People />} />
  <Route path='/person/details/:id' element={<PersonDetails />} />
  <Route path='*' element={<NotFound />} />
 
  
</Routes>

    </div>
  )
}

export default App