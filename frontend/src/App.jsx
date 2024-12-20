import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminMenu from './admin_menu/admin_menu';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-menu" element={<AdminMenu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
