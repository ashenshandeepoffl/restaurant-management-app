import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminMenu from "./admin/admin_menu";
import AdminLandingPage from "./admin/admin_landinpage";
import ViewMenu from "./admin/view_menu";
import EditMenu from "./admin/edit_menu"; 
import PaymentPage from "./components/PaymentPage"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* Admin Routes */}
        <Route path="/admin-menu" element={<AdminMenu />} />
        <Route path="/admin-landinpage" element={<AdminLandingPage />} />
        <Route path="/view-menu" element={<ViewMenu />} />
        <Route path="/edit-menu" element={<EditMenu />} /> 
        
        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="orders" element={<Dashboard activeTab="orders" />} />
          <Route path="reservation" element={<Dashboard activeTab="reservation" />} />
          <Route path="feedback" element={<Dashboard activeTab="feedback" />} />
          <Route path="special-offers" element={<Dashboard activeTab="specialOffers" />} />
        </Route>

        {/* Protected Payment Route */}
        <Route
          path="/payment/:orderId"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
