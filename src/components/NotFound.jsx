import React from 'react'
import notfound from '/404Error.gif'
const NotFound = () => {
  return (
    <div className='w-screen bg-black h-screen flex items-center justify-center'>
        <img src={notfound} alt="" />
    </div>
  )
}

export default NotFound