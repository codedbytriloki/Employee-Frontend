import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/dashBoard/AdminSidebar';
import Navbar from '../components/dashBoard/Navbar';
import AdminSummary from '../components/dashBoard/AdminSummary';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading } = useAuth()

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen '>
        <Navbar />
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard