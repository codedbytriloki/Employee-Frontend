import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashBoard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import AddEmp from './components/employee/AddEmp';
import View from './components/employee/View';
import EditEmployee from './components/employee/EditEmployee';
import Add from './components/salary/Add';
import ViewSalary from './components/salary/ViewSalary';
import SummaryCard from './components/EmployeeDashboard/SummaryCard';
import LeaveList from './components/leave/List';
import AddLeave from './components/leave/AddLeave';
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/leave/Table';
import Detail from './components/leave/Detail';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]} >
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        } >
          <Route index element={<AdminSummary />}></Route>
          <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/departments/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/departments/:id' element={<EditDepartment />}></Route>
          <Route path='/admin-dashboard/employees' element={<List />}></Route>
          <Route path='/admin-dashboard/employees/add-employee' element={<AddEmp />}></Route>
          <Route path='/admin-dashboard/employees/:id' element={<View />}></Route>
          <Route path='/admin-dashboard/employees/edit/:id' element={<EditEmployee />}></Route>
          <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/admin-dashboard/salary/add' element={<Add />}></Route>
          <Route path='/admin-dashboard/leaves' element={<Table />}></Route>
          <Route path='/admin-dashboard/leaves/:id' element={<Detail />}></Route>
          <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/admin-dashboard/setting' element={<Setting />}></Route>

        </Route>
        <Route path='/employee-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        } >
          <Route index element={<SummaryCard />}></Route>
          <Route path='/employee-dashboard/profile/:id' element={<View />} ></Route>
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />} ></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />} ></Route>
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />} ></Route>
          <Route path='/employee-dashboard/setting' element={<Setting />} ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
