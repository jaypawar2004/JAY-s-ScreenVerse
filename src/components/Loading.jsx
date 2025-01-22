import React from 'react'
import loader from '/loader.svg'
const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <img className='w-[50vh]' src={loader} alt="" />
    </div>
  )
}

export default Loading