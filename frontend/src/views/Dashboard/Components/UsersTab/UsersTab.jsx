import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersTab.css';

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  // Agregamos estado para búsqueda

  // Recuperar los usuarios al cargar el componente
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

  // Función para cambiar el rol de un usuario
  const changeUserRole = async (userId, newRole) => {
    const token = localStorage.getItem('token');
    
    try {
      // Actualizamos el backend con el nuevo rol
      await axios.put(
        'http://localhost:3000/users/change-role',
        { userId, newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Actualizar el estado local para reflejar el cambio inmediatamente
      setUsers((prevUsers) =>
        prevUsers.map((user) => 
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error('Error changing user role:', error.message);
    }
  };

  // Función para alternar el estado del usuario (activo/suspendido)
  const toggleUserStatus = async (userId, currentStatus) => {
    const token = localStorage.getItem('token');
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';

    try {
      // Llamada PUT para alternar el estado del usuario
      await axios.put(
        'http://localhost:3000/users/status',
        { userId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Actualizamos el estado local para reflejar el cambio inmediatamente
      setUsers((prevUsers) =>
        prevUsers.map((user) => 
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user status:', error.message);
    }
  };

  // Filtrar usuarios según la búsqueda por nombre
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-tab">
      <h2>Manage Users</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {filteredUsers.map((user) => (
        <div key={user.id} className="user-row">
          <span>{user.name}</span>
          
          {/* Selector de rol */}
          <select value={user.role} onChange={(e) => changeUserRole(user.id, e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Botón para activar o suspender al usuario */}
          <button
            onClick={() => toggleUserStatus(user.id, user.status)}
            className={`status-button ${user.status === 'suspended' ? 'activate' : 'suspend'}`}
          >
            {user.status === 'suspended' ? 'Activate' : 'Suspend'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UsersTab;
