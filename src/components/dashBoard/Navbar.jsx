import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className='flex items-center justify-between text-white h-12 bg-teal-600 px-5'>
      <p >Welcome {user.name}</p>
      <button className='p-2 bg-teal-700 hover:bg-teal-800' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar