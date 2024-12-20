import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const AdminLandingPage = () => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate('/view-menu');
  };

  const handleAddMenu = () => {
    navigate('/admin-menu');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <div style={styles.options}>
        <button style={styles.button} onClick={handleViewMenu}>
          View Menu
        </button>
        <button style={styles.button} onClick={handleAddMenu}>
          Add Menu
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  options: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#007BFF',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
};

export default AdminLandingPage;
