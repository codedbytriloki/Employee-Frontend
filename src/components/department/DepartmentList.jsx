import React, { useEffect, useState } from 'react'
import { data, Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
  const [department, setDepartment] = useState([]);
  const [filterDepartment, setfilterDepartment] = useState([]);

  const onDepartmentDel = async () => {
    fetchDepartment()
  }
  const fetchDepartment = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/department', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => (
          {
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons _id={dep._id} onDepartmentDel={onDepartmentDel} />),
          }
        ))
        setDepartment(data);
        setfilterDepartment(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data)
      }
    }
  }

  useEffect(() => {
    fetchDepartment();
  }, [])

  const filterdep = (e) => {
    const recorts = department.filter((dep) => (
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setfilterDepartment(recorts);
  }

  return (
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search By Dep Name' className='px-5 py-1 border' onChange={filterdep} />
        <Link to="/admin-dashboard/departments/add-department" className='px-12 py-1 bg-teal-600 rounded text-white' >+ Add New Department</Link>
      </div>
      <div className='mt-5'>
        <DataTable columns={columns} data={filterDepartment} pagination />
      </div>
    </div>
  )
}

export default DepartmentList