import React, { useEffect, useState } from 'react'
import { fetchDepartment, getEmployees } from '../../utils/EmployeeHelper'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [employee, setEmployee] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
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
    if (!id) return;
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

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/api/salary/add`, employee, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate('/admin-dashboard/employees')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        // handle error
        alert(error.response.data.error);
      }
    }
  }


  return (
    <>{departments ? (<div className='max-w-4xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md '>
      <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700' >Department</label>
            <select name="department" onChange={handleDepartment} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id} >{dep.dep_name}</option>
              ))}
            </select>
          </div>
          <div >
            <label className='block text-sm font-medium text-gray-700' >Employee</label>
            <select name="employeeId" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id} >{emp.employeeId}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' >Basic Salary</label>
            <input type="text" name="basicSalary" onChange={handleChange} placeholder='Basic Salary' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' >Allowances</label>
            <input type="number" name="allowances" placeholder='allowances' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' >Deductions</label>
            <input type="number" name="deductions" placeholder='Deductions' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' >Pay Date</label>
            <input type="date" name="payDate" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>

        </div>
        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' >Add Salary</button>
      </form>
    </div>) : <div>Loading .....</div>}</>

  )
}
export default Add