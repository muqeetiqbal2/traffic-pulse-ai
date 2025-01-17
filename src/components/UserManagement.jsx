import React, { useState } from 'react';
import './css/UserManagement.css';
import NavBar from './NavBar';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleData, setRoleData] = useState({
    username: '',
    role: '',
  });

  const users = [
    { username: 'muqeeti', role: 'Admin', email: 'muqeet@gmail.com', lastLogin: '2023-10-15 14:35', status: 'Active' },
    { username: 'musama', role: 'Editor', email: 'usama@gmail.com', lastLogin: '2023-10-15 09:20', status: 'Inactive' },
    { username: 'msherry', role: 'Editor', email: 'sherryar@gmail.com', lastLogin: '2023-10-15 12:20', status: 'Active' },
  ];

  const accessLogs = [
    { log: 'User musama logged in on 2023-10-15 14:35' },
    { log: 'User msherry updated profile on 2023-10-14 11:00' },
  ];

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleUpdate = (e) => {
    e.preventDefault();
    console.log('Role Updated:', roleData);
    // Add logic for role update
  };

  return (
    <div className="user-management-container">
      <div>
        <NavBar/>
      </div>
      <div className="user-main-container">
      <section className="user-management">
        <div className="header">
          <h3>User Management</h3>
          <button className="add-user-button">Add New User</button>
        </div>
        <input
          type="text"
          placeholder="Search users"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.lastLogin}</td>
                <td className={user.status === 'Active' ? 'status-active' : 'status-inactive'}>
                  {user.status}
                </td>
                <td>
                  <button className="edit-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="role-management">
        <h3>Role Management</h3>
        <form onSubmit={handleRoleUpdate}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={roleData.username}
              onChange={(e) =>
                setRoleData({ ...roleData, username: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Assign Role</label>
            <input
              type="text"
              placeholder="Enter role"
              value={roleData.role}
              onChange={(e) => setRoleData({ ...roleData, role: e.target.value })}
            />
          </div>
          <button type="submit" className="update-role-button">Update Role</button>
        </form>
      </section>

      <section className="access-logs">
        <h3>Access Logs</h3>
        <ul>
          {accessLogs.map((log, index) => (
            <li key={index}>{log.log}</li>
          ))}
        </ul>
      </section>
    </div>
    </div>
  );
};

export default UserManagement;
