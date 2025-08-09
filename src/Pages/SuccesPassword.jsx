import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuccesPassword = () => {
  const navigate = useNavigate();
  return (
    <>
   <div className='container d-flex flex-column align-items-center'>
     <h1 className='text-center my-4'>SuccesPassword</h1>
    <button 
      onClick={() => navigate("/login")}
    className='btn btn-primary'>Acceder</button>
   </div>
    </>
  )
}

export default SuccesPassword