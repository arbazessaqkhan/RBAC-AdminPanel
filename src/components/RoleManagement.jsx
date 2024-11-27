/** @jsxImportSource https://esm.sh/react */
import React, { useState } from "https://esm.sh/react";
import RoleModal from "./RoleModal";
import { FaLock } from "react-icons/fa"; // Importing an icon for consistency


const RoleManagement = ({ roles, setRoles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null); // For edit modal

  const handleAddRole = () => {
    setCurrentRole({ name: "", permissions: [] }); // Reset role for adding
    setIsModalOpen(true);
  };

  const handleEditRole = (role) => {
    setCurrentRole(role); // Set role for editing
    setIsModalOpen(true);
  };

  const handleSaveRole = (role) => {
    if (currentRole?.id) {
      // Update existing role
      setRoles(roles.map((r) => (r.id === role.id ? role : r)));
    } else {
      // Add new role
      setRoles([...roles, { ...role, id: roles.length + 1 }]);
    }
    setIsModalOpen(false); // Close modal
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId)); // Delete role
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Role Management</h1>
      {/* Add Role Button */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary btn-lg d-flex align-items-center" onClick={handleAddRole}>
          <FaLock className="me-2" /> Add Role
        </button>
      </div>
      {isModalOpen && (
        <RoleModal
          isOpen={isModalOpen}
          onSave={handleSaveRole}
          onClose={() => setIsModalOpen(false)}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
        />
      )}

      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Permissions</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>
                  {role.permissions.map((perm) => (
                    <span key={perm} className="badge bg-success me-2">
                      {perm.charAt(0).toUpperCase() + perm.slice(1)}
                    </span>
                  ))}
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEditRole(role)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteRole(role.id)}
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

export default RoleManagement;
