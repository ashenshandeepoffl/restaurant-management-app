import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminMenu from './admin/admin_menu';
import AdminLandingPage from './admin/admin_landinpage';
import ViewMenu from './admin/view_menu';
import EditMenu from './admin/edit_menu';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
