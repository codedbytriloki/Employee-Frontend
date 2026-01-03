import React, { useEffect, useState } from 'react'
import { fetchDepartment } from '../../utils/EmployeeHelper'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    designation: '',
    department: '',
    salary: 0
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartment = async () => {
      const department = await fetchDepartment();
      setDepartments(department);
    }
    getDepartment();
  }, [])

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/employee/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee((prev) => ({
            ...prev, name: emp.userId.name,
            maritalStatus: emp.maritalStatus,
            designation: emp.designation,
            salary: emp.salary,
            department: emp.department._id
          }))
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data)
        }
      }
    }
    fetchEmployee();
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/api/employee/edit/${id}`, employee, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate('/admin-dashboard/employees')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <>{employee && departments ? (<div className='max-w-4xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md '>
      <h2 className='text-2xl font-bold mb-6'>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700' >Name</label>
            <input type="text" name="name" value={employee.name} placeholder='Enter name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange} required />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' >Marital Status</label>
            <select name="maritalStatus" value={employee.maritalStatus} onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
              <option value="">Select Status </option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' >Designation</label>
            <input type="text" name="designation" value={employee.designation} onChange={handleChange} placeholder='Designation' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' >Salary</label>
            <input type="number" name="salary" value={employee.salary} placeholder='Salary' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700' >Department</label>
            <select name="department" value={employee.department} onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id} >{dep.dep_name}</option>
              ))}
            </select>
          </div>
        </div>
        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' >Update Employee</button>
      </form>
    </div>) : <div>Loading .....</div>}</>

  )
}

export default EditEmployee