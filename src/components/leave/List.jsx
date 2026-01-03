import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


const List = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`https://employee-backend-smoky.vercel.app/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setLeaves(response.data.leaves)
        setFilteredLeaves(response.data.leaves)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        // handle error
      }
    }
  }
  useEffect(() => {
    fetchLeaves();
  }, [])

  if (!leaves) {
    return <div>Loading...</div>
  }

  return (
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search By Dep Name' className='px-5 py-1 border' />
        {user.role === "employee" &&
          <Link to="/employee-dashboard/add-leave" className='px-12 py-1 bg-teal-600 rounded text-white' >+ Add New Leave</Link>}
      </div>
      <div className='mt-5'>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
            <tr>
              <th className='px-6 py-3'>SNO</th>
              <th className='px-6 py-3'>LEAVE TYPE</th>
              <th className='px-6 py-3'>FROM</th>
              <th className='px-6 py-3'>TO</th>
              <th className='px-6 py-3'>DESCRIPTION</th>
              <th className='px-6 py-3'>APPLIED DATE</th>
              <th className='px-6 py-3'>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-3'>{sno++}</td>
                <td className='px-6 py-3'>{leave.leaveType}</td>
                <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{leave.reason}</td>
                <td className='px-6 py-3'>{new Date(leave.appliedAt).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List