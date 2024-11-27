/** @jsxImportSource https://esm.sh/react */
import React from "https://esm.sh/react";

const RoleModal = ({ isOpen, onClose, onSave, currentRole, setCurrentRole }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRole((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePermission = (permission) => {
    setCurrentRole((prev) => {
      const permissions = prev.permissions || [];
      if (permissions.includes(permission)) {
        return {
          ...prev,
          permissions: permissions.filter((perm) => perm !== permission),
        };
      } else {
        return {
          ...prev,
          permissions: [...permissions, permission],
        };
      }
    });
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{currentRole ? "Edit Role" : "Add Role"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* Role Name */}
            <div className="mb-3">
              <label className="form-label">Role Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={currentRole?.name || ""}
                onChange={handleChange}
              />
            </div>

            {/* Permissions */}
            <div className="mb-3">
              <label className="form-label">Permissions</label>
              <div className="d-flex flex-wrap">
                {["read", "write", "update", "delete"].map((perm) => (
                  <button
                    key={perm}
                    type="button"
                    className={`btn btn-sm me-2 mb-2 ${
                      currentRole?.permissions?.includes(perm) ? "btn-success" : "btn-outline-secondary"
                    }`}
                    onClick={() => togglePermission(perm)}
                  >
                    {perm.charAt(0).toUpperCase() + perm.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={() => onSave(currentRole)}>
              {currentRole ? "Save Changes" : "Add Role"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
