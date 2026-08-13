import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col relative'>
        <button onClick={()=>navigate('/login')} className='cursor-pointer absolute top-50 left-142 text-gray-400'>Home</button>

        <h1 className='text-center text-4xl'>404| Not found </h1>
    </div>
  )
}

export default NotFound