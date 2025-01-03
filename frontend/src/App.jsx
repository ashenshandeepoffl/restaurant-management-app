import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminMenu from './admin/admin_menu';
import AdminLandingPage from './admin/admin_landinpage';
import ViewMenu from './admin/view_menu';
import EditMenu from './admin/edit_menu';
import EditCustomers from './admin/admin_edit_customers'; 
import AddCustomer from './admin/admin_add_customers';
import ViewCustomers from './admin/admin_view_customers';
import AdminCustomerDashboard from './admin/admin_customer';
import AdminMenuDashboard from './admin/admin_menu_dashboard';
import AdminStaffDashboard from './admin/admin_staff_dashboard';
import AdminAddStaff from './admin/admin_add_staff';
import Navbar from './admin/navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-menu" element={<AdminMenu />} />
          <Route path="/admin-landinpage" element={<AdminLandingPage />} />
          <Route path="/view-menu" element={<ViewMenu />} />
          <Route path="/edit-menu" element={<EditMenu />} />
          <Route path="/admin-edit-customers" element={<EditCustomers />} />
          <Route path="/admin-add-customers" element={<AddCustomer />} />
          <Route path="/admin-view-customers" element={<ViewCustomers />} />
          <Route path="/admin-customers" element={<AdminCustomerDashboard/>} />
          <Route path="/admin-menu-dashboard" element={<AdminMenuDashboard/>} />
          <Route path="/admin-staff-dashboard" element={<AdminStaffDashboard/>} />
          <Route path="/add-staff" element={<AdminAddStaff/>} />
          <Route path="/Navbar" element={<Navbar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
