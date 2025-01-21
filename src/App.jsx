import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'

const App = () => {
  return (
    <div className=' bg-[#1F1E24] flex w-screen h-screen'>

<Routes>
  
  <Route path='/' element={<HomePage />} />
  
</Routes>

    </div>
  )
}

export default App