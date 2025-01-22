import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Trending from './components/Trending'

const App = () => {
  return (
    <div className=' bg-[#1F1E24] flex w-screen h-screen'>

<Routes>
  
  <Route path='/' element={<HomePage />} />
  <Route path='/trending' element={<Trending />} />
  
</Routes>

    </div>
  )
}

export default App