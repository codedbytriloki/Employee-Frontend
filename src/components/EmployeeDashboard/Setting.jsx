import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const { user } = useAuth()
  const navigate = useNavigate();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
    }
    else {
      try {
        const response = await axios.put("https://employee-backend-smoky.vercel.app/api/setting/change-password", setting, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          navigate('/')
          localStorage.setItem("token", response.data.token)
          if (response.data.user.role === "admin") {
            navigate('/admin-dashboard')
          } else {
            navigate('/admin-dashboard/employees');
            setError("")
          }
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An unexpected error occurred");
        }
      }
    }
  }
  return (
    <div className='flex flex-col items-center mt-7 justify-center bg-gradient-to-bto-gray-100 to-50% '>
      <h1 className='font-sevillana text-3xl text-teal-600'>Change Password</h1>
      <div className='border shadow p-6 w-80 bg-white mt-5'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold mb-2'>Logic</h2>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <div className='mb-4'>
            <label htmlFor="oldPassword" className='block mb-2 text-gray-700' >Old Password</label>
            <input type="password" name='oldPassword' placeholder='Change Password' className='w-full px-3 py-2 border' onChange={handleChange} required />
          </div>
          <div className='mb-4'>
            <label htmlFor="newPassword" className='block mb-2 text-gray-700'>New Password</label>
            <input type="password" name='newPassword' placeholder='New Password' className='w-full px-3 py-2 border' onChange={handleChange} required />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block mb-2 text-gray-700'>Confirm Password</label>
            <input type="password" name='confirmPassword' placeholder='Confirm Password' className='w-full px-3 py-2 border' onChange={handleChange} required />
          </div>
          <div className='mb-4'>
            <button className='w-full bg-teal-600 text-white py-2'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Setting