import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminMenu from './admin/admin_menu';
import AdminLandingPage from './admin/admin_landinpage';
import ViewMenu from './admin/view_menu';
import EditMenu from './admin/edit_menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/admin-menu" element={<AdminMenu />} />
        <Route path="/admin-landinpage" element={<AdminLandingPage />} />
        <Route path="/view-menu" element={<ViewMenu />} />
        <Route path="/edit-menu" element={<EditMenu />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
