import React from 'react'
import loading from '/loading.gif'
const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='' src={loading} alt="" />
       
    </div>
  )
}

export default Loading