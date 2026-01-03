import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({ dep_name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/department/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          setDepartment(response.data.department)
          // console.log(response.data.department.dep_name);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data)
        }
      }
    }
    fetchDepartment();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/department/edit/${id}`, department, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data)
      }
    }
  }

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h3 className='text-2xl font-bold mb-6'>Edit Department</h3>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="dep_name" className='block text-sm font-medium text-gray-700'>Department Name</label>
          <input type="text" value={department.dep_name} name='dep_name' placeholder='Enter Dep Name' onChange={handleChange} className='mt-1 w-full p-2 border border-gray-300 rounded-md' />
        </div>
        <div className='mt-3'>
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
          <textarea name="description" value={department.description} placeholder='Description' onChange={handleChange} className='mt-1 w-full p-2 border border-gray-300 rounded-md' rows="4"></textarea>
        </div>
        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Edit Department</button>
      </form>
    </div>
  )
}

export default EditDepartment