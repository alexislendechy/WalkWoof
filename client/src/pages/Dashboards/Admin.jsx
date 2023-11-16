import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/users'); // Adjust URL as necessary
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users');
    }
  };

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/admin/users/${userId}`); // Adjust URL as necessary
      fetchUsers(); // Refresh the user list
    } catch (err) {
      setError('Error deleting user');
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <p>{error}</p>}
      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - Role: {user.role}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
