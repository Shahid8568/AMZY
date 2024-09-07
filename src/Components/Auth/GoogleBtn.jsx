import React from 'react'
import { FaGoogle } from 'react-icons/fa'

const GoogleBtn = ({ signInWithGoogle }) => {
  return (
    <>
      <span className='or'>OR</span>
      <button onClick={signInWithGoogle} className='fw-bold mt-2 googleBtn btn btn-primary' ><FaGoogle /> Sign in with Google</button>
    </>
  )
}

export default GoogleBtn
