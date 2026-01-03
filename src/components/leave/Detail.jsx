import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Detail = () => {
  const [leaves, setLeaves] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://employee-backend-smoky.vercel.app/api/leave/details/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          setLeaves(response.data.leaves)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data)
        }
      }
    }
    fetchLeave();
  }, [])

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://employee-backend-smoky.vercel.app/api/leave/update/${id}`, { status }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate('/admin-dashboard/leaves')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data)
      }
    }
  }

  return (
    <> {leaves ? (<div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-8 text-center'>Leave Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <img src={`https://employee-backend-smoky.vercel.app/${leaves.employeeId.userId.profileImage}`} alt="" className='rounded-full border w-72' />
        </div>
        <div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Name : </p>
            <p className='font-medium'>{leaves.employeeId.userId.name}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Employee ID : </p>
            <p className='font-medium'>{leaves.employeeId.employeeId}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Leave Type : </p>
            <p className='font-medium'>{leaves.leaveType}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Reason : </p>
            <p className='font-medium'>{leaves.reason}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Department : </p>
            <p className='font-medium'>{leaves.employeeId.department.dep_name}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Start Date : </p>
            <p className='font-medium'>{new Date(leaves.endDate).toLocaleDateString()}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>End Date : </p>
            <p className='font-medium'>{new Date(leaves.appliedAt).toLocaleDateString()}</p>
          </div>
          <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>
              {leaves.status === "Pending" ? "Action :" : "Status :"}
            </p>
            {leaves.status === "Pending" ? (
              <div>
                <button onClick={() => changeStatus(leaves._id, "Approved")} className='bg-green-500 text-white px-4 py-2 rounded mr-2'>Approve</button>
                <button onClick={() => changeStatus(leaves._id, "Rejected")} className='bg-red-500 text-white px-4 py-2 rounded'>Reject</button>
              </div>
            ) : <p>{leaves.status}</p>}
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>) : <div>Loading ....</div>} </>
  )
}

export default Detail