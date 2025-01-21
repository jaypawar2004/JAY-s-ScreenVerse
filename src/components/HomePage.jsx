import React from 'react'
import 'remixicon/fonts/remixicon.css'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'

const HomePage = () => {
  return (
    document.title = 'HomePage',
    <>
    <Sidenav />
    <div className='w-[80%] h-full'>
    <Topnav />


    </div>
    </>
  )
}

export default HomePage