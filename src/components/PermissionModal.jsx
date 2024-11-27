import React, { useState, useEffect } from "https://esm.sh/react";

const PermissionModal = ({ isOpen, onClose, onSave, currentPermission, setCurrentPermission }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentPermission) {
      setName(currentPermission.name);
      setError("");
    } else {
      setName("");
    }
  }, [currentPermission]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({ ...currentPermission, name });
      onClose();
    } else {
      setError("Permission name is required.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{currentPermission ? "Edit Permission" : "Add Permission"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Permission Name</label>
              <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(""); // clear error on input change
                }}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
