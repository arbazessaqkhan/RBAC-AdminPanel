import React, { useState } from "https://esm.sh/react";
import PermissionModal from "./PermissionModal";
import { FaLock } from "react-icons/fa"; // permission button icon

const PermissionManagement = ({ permissions = [], setPermissions, users = [], setUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);
  const [error, setError] = useState("");

  const handleAddPermission = () => {
    setCurrentPermission(null); 
    setIsModalOpen(true);
    setError(""); 
  };

  const handleEditPermission = (permission) => {
    setCurrentPermission(permission);
    setIsModalOpen(true);
    setError(""); // clear error on edit
  };

  const handleSavePermission = (permission) => {
    if (!permission.name.trim()) {
      setError("Permission name is required.");
      return;
    }

    if (currentPermission?.id) {
      //if editing, update the existing permission
      const updatedPermissions = permissions.map((perm) =>
        perm.id === currentPermission.id ? { ...perm, name: permission.name } : perm
      );
      setPermissions(updatedPermissions);

      //update permissions for users
      const updatedUsers = users.map((user) => {
        const updatedPermissions = user.permissions.map((perm) =>
          perm === currentPermission.name ? permission.name : perm
        );
        return { ...user, permissions: updatedPermissions };
      });
      setUsers(updatedUsers);
    } else {
      //if adding new permission, add it to the list
      const newPermission = { id: permissions.length + 1, name: permission.name };
      setPermissions([...permissions, newPermission]);
    }
    setIsModalOpen(false); //close the modal
  };

  const handleDeletePermission = (permissionId) => {
    const updatedPermissions = permissions.filter((perm) => perm.id !== permissionId);
    setPermissions(updatedPermissions);

    const updatedUsers = users.map((user) => {
      const updatedPermissions = user.permissions.filter((perm) => perm !== permissions.find(p => p.id === permissionId).name);
      return { ...user, permissions: updatedPermissions };
    });
    setUsers(updatedUsers);
  };

  return (
    <div className="container mt-4">

          <h1 className="text-center mb-4 text-primary">Permission Management</h1>
          {/* Add Permission Button */}
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary btn-lg d-flex align-items-center" onClick={handleAddPermission}>
              <FaLock className="me-2" /> Add Permission
            </button>
          </div>

          {/* Permission Modal */}
          {isModalOpen && (
            <PermissionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSavePermission}
              currentPermission={currentPermission}
              error={error}
              setError={setError}
            />
          )}

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Permission Name</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission) => (
                  <tr key={permission.id}>
                    <td>{permission.name}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEditPermission(permission)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeletePermission(permission.id)}
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

export default PermissionManagement;
