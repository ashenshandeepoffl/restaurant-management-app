import React, { useState, useEffect } from 'react';

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  // Fetch users (mocked data for this example)
  useEffect(() => {
    // Replace this with an API call in real-world usage
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
    ]);
  }, []);

  // Handle input changes for new user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Add a new user
  const addUser = () => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: '', email: '', role: '' });
  };

  // Edit an existing user
  const saveEditedUser = () => {
    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
    setEditingUser(null);
  };

  // Delete a user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

      {/* New User Form */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Add New User</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full md:w-1/3 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full md:w-1/3 rounded"
          />
          <input
            type="text"
            placeholder="Role"
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full md:w-1/4 rounded"
          />
          <button
            onClick={addUser}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-3">ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center hover:bg-gray-100">
                <td className="border p-3">{user.id}</td>
                <td className="border p-3">
                  {editingUser?.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      className="border border-gray-300 p-1 rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border p-3">
                  {editingUser?.id === user.id ? (
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="border border-gray-300 p-1 rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border p-3">
                  {editingUser?.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      className="border border-gray-300 p-1 rounded"
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="border p-3">
                  {editingUser?.id === user.id ? (
                    <button
                      onClick={saveEditedUser}
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingUser(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUsers;
