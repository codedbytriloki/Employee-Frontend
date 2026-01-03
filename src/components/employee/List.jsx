import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';

const List = () => {

  const [employee, setEmployee] = useState([]);
  const [filterEmployee, setFilterEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employee.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img alt='' className='rounded-full w-10' src={`http://localhost:4000/${emp.userId.profileImage}`} />,
              action: (<EmployeeButtons _id={emp._id} Id={emp._id} />),
            }
          ))
          setEmployee(data);
          setFilterEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data)
        }
      }
    }
    fetchEmployee();
  }, [])

  const handleFilter = (e) => {
    const records = employee.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilterEmployee(records);
  }

  return (
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search By Dep Name' className='px-5 py-1 border' onChange={handleFilter} />
        <Link to="/admin-dashboard/employees/add-employee" className='px-12 py-1 bg-teal-600 rounded text-white' >+ Add New Employee</Link>
      </div>
      <div className='mt-5'>
        <DataTable columns={columns} data={filterEmployee} pagination />
      </div>
    </div>
  )
}

export default List