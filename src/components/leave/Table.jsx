import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LeaveButtons } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper';


const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/leave', {
        headers: {
          "Authorization": `bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => {
          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);
          const daysDiff = Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000) + 1;
          const days = daysDiff > 0 ? daysDiff : 0;
          return {
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name,
            leaveType: leave.leaveType,
            department: leave.employeeId.department.dep_name,
            days,
            status: leave.status,
            action: <LeaveButtons Id={leave._id} />,
          };
        })
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data)
      }
    }
  }

  useEffect(() => {
    fetchEmployee()
  }, [])

  const filterByInput = (e) => {
    const data = leaves.filter((leave) => (leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())))
    setFilteredLeaves(data);
  }

  const filterByButton = (status) => {
    const data = leaves.filter((leave) => (leave.status.toLowerCase().includes(status.toLowerCase())))
    setFilteredLeaves(data);
  }

  return (
    <>
      {
        filteredLeaves ? (<div className='p-5' >
          <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
          </div>
          <div className='flex justify-between items-center'>
            <input type="text" placeholder='Search By Emp ID' onChange={filterByInput} className='px-5 py-1 border' />
            <div>
              <button className='px-5 py-2 mx-1 bg-teal-600 rounded text-white' onClick={() => filterByButton("Pending")} >Pending</button>
              <button className='px-5 py-2 mx-1 bg-teal-600 rounded text-white' onClick={() => filterByButton("Approved")} >Approved</button>
              <button className='px-5 py-2 mx-1 bg-teal-600 rounded text-white' onClick={() => filterByButton("Rejected")} >Rejected</button>
            </div>
          </div>
          <div className='mt-5'>
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div >) : <div>Loading...</div>}
    </>
  )
}

export default Table