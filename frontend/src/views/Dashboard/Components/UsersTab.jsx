import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersTab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data?.message || error.message);
      }
    };
    fetchUsers();
  }, []);

  const changeUserRole = async (userId, newRole) => {
    const token = localStorage.getItem('token'); // Definir token

    try {
      const response = await axios.put(
        'http://localhost:3000/users/change-role',
        { userId, newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message);

      // Actualizar el rol en el estado
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error('Error changing user role:', error.response?.data?.message || error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.put(`http://localhost:3000/users/${userId}/suspend`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <select
            value={user.role}
            onChange={(e) => changeUserRole(user.id, e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UsersTab;
