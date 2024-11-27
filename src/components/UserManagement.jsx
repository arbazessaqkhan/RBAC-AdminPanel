/** @jsxImportSource https://esm.sh/react */
import React, { useState } from "https://esm.sh/react";
import UserModal from "./UserModal";
import { FaUserPlus } from "react-icons/fa"; // Importing an icon for the Add User button


const UserManagement = ({ users = [], setUsers, roles = [], permissions = [], statuses = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAddUser = () => {
    setCurrentUser({ username: "", email: "", roleId: "", status: statuses[0]?.name, permissions: [] });
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (user) => {
    if (currentUser?.id) {
      setUsers(users.map((u) => (u.id === currentUser.id ? { ...currentUser, ...user } : u)));
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">User Management</h1>
      {/* Add User Button */}
      <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary btn-lg d-flex align-items-center" onClick={handleAddUser}>
              <FaUserPlus className="me-2" /> Add User
            </button>
          </div>
      {isModalOpen && (
        <UserModal
          user={currentUser}
          onSave={handleSaveUser}
          onClose={() => setIsModalOpen(false)}
          roles={roles}
          permissions={permissions}
          statuses={statuses}
        />
      )}
      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Permissions</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{roles.find((role) => role.id === parseInt(user.roleId))?.name || "No Role"}</td>
                <td>
                  <span className={`badge ${user.status === "Active" ? "bg-success" : "bg-danger"}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  {user.permissions.map((perm) => (
                    <span key={perm} className="badge bg-success me-2">
                      {perm.charAt(0).toUpperCase() + perm.slice(1)}
                    </span>
                  ))}
                </td>
                <td className="text-center">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditUser(user)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(user.id)}>
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

export default UserManagement;
