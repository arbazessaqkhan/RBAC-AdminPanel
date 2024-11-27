/** @jsxImportSource https://esm.sh/react */
import React, { useState, useEffect } from "https://esm.sh/react";

const StatusModal = ({ isOpen, onClose, onSave, currentStatus, setCurrentStatus }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (currentStatus) {
      setName(currentStatus.name);
    } else {
      setName(""); // Reset form for new status
    }
  }, [currentStatus]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({ ...currentStatus, name });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{currentStatus ? "Edit Status" : "Add Status"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Status Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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

export default StatusModal;
