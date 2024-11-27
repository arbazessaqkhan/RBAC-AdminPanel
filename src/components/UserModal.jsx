/** @jsxImportSource https://esm.sh/react */
import React, { useState, useEffect } from "https://esm.sh/react";

const UserModal = ({ user, roles, statuses, permissions, onClose, onSave }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');
  const [status, setStatus] = useState('');
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRoleId(user.roleId);
      setStatus(user.status);
      setUserPermissions(user.permissions || []);
    }
  }, [user]);

  const togglePermission = (permission) => {
    setUserPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    onSave({ ...user, username, email, roleId, status, permissions: userPermissions });
  };

  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{user ? "Edit User" : "Add User"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-select" value={roleId} onChange={(e) => setRoleId(e.target.value)}>
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                {statuses.map((status) => (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Permissions</label>
              <div className="d-flex flex-wrap">
                {permissions.map((perm) => (
                  <button
                    key={perm.id}
                    type="button"
                    className={`btn btn-sm me-2 mb-2 ${
                      userPermissions.includes(perm.name) ? "btn-success" : "btn-outline-secondary"
                    }`}
                    onClick={() => togglePermission(perm.name)}
                  >
                    {perm.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
