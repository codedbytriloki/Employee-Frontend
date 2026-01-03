import axios from "axios";
import { useNavigate } from "react-router-dom"

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action
  },
]

export const DepartmentButtons = ({ _id, onDepartmentDel }) => {
  const navigate = useNavigate();

  const handledelete = async (_id) => {
    const confirm = window.confirm("Do you want to delete ?")

    try {
      if (confirm) {
        const response = await axios.delete(`http://localhost:4000/api/department/delete/${_id}`, {
          headers: {
            "Authorization": `bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          onDepartmentDel();
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data)
      }
    }
  }

  return (
    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-teal-600 text-white" onClick={() => navigate(`/admin-dashboard/departments/${_id}`)} >Edit</button>
      <button className="px-3 py-1 bg-red-600 text-white" onClick={() => handledelete(_id)} >Delete</button>
    </div>
  )
}