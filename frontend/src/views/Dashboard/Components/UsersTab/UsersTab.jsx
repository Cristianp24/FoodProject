import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersTab.css';

const UsersTab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };
    fetchUsers();
  }, []);

  const changeUserRole = async (userId, newRole) => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        'http://localhost:3000/users/change-role',
        { userId, newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) => user.id === userId ? { ...user, role: newRole } : user)
      );
    } catch (error) {
      console.error('Error changing user role:', error.message);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    const token = localStorage.getItem('token');
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
  
    try {
      const response = await axios.put(
        'http://localhost:3000/users/status',
        { userId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setUsers((prevUsers) =>
        prevUsers.map((user) => user.id === userId ? { ...user, status: newStatus } : user)
      );
    } catch (error) {
      console.error('Error toggling user status:', error.message);
    }
  };

  return (
    <div className="users-tab">
      <h2>Manage Users</h2>
      {users.map((user) => (
        <div key={user.id} className="user-row">
          <span>{user.name}</span>
          <select value={user.role} onChange={(e) => changeUserRole(user.id, e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button 
            onClick={() => toggleUserStatus(user.id, user.status)} 
            className={user.status === 'suspended' ? 'suspended' : ''}
          >
            {user.status === 'suspended' ? 'Activate' : 'Suspend'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UsersTab;
