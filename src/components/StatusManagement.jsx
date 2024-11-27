/** @jsxImportSource https://esm.sh/react */
import React, { useState } from "https://esm.sh/react";
import StatusModal from "./StatusModal";
import { FaRegFileAlt } from "react-icons/fa"; // Icon for the status button

const StatusManagement = ({ statuses = [], setStatuses, users = [], setUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [error, setError] = useState("");

  const handleAddStatus = () => {
    setCurrentStatus(null); // Reset form for new status
    setIsModalOpen(true);
    setError(""); // Clear any previous errors
  };

  const handleEditStatus = (status) => {
    setCurrentStatus(status);
    setIsModalOpen(true);
    setError(""); // Clear any previous errors
  };

  const handleSaveStatus = (status) => {
    if (!status.name.trim()) {
      setError("Status name is required.");
      return;
    }

    if (currentStatus?.id) {
      // If editing, update the existing status
      const updatedStatuses = statuses.map((s) =>
        s.id === currentStatus.id ? { ...s, name: status.name } : s
      );
      setStatuses(updatedStatuses);

      // Update users with the new status
      const updatedUsers = users.map((user) =>
        user.status === currentStatus.name ? { ...user, status: status.name } : user
      );
      setUsers(updatedUsers);
    } else {
      // If adding new status, add it to the list
      const newStatus = { id: statuses.length + 1, name: status.name };
      setStatuses([...statuses, newStatus]);
    }
    setIsModalOpen(false); // Close the modal
  };

  const handleDeleteStatus = (statusId) => {
    const updatedStatuses = statuses.filter((status) => status.id !== statusId);
    setStatuses(updatedStatuses);

    // Update users to reflect deleted status
    const updatedUsers = users.map((user) => {
      const updatedStatus = user.status === statuses.find((status) => status.id === statusId)?.name
        ? { ...user, status: "Inactive" } // Default to "Inactive" if deleted status was assigned
        : user;
      return updatedStatus;
    });
    setUsers(updatedUsers);
  };

  return (
    <div className="container mt-4">
          <h1 className="text-center mb-4 text-primary">Status Management</h1>
          {/* Add Status Button */}
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary btn-lg d-flex align-items-center" onClick={handleAddStatus}>
              <FaRegFileAlt className="me-2" /> Add Status
            </button>
          </div>

          {/* Status Modal */}
          {isModalOpen && (
            <StatusModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveStatus}
              currentStatus={currentStatus}
              error={error}
              setError={setError}
            />
          )}

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Status Name</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {statuses.map((status) => (
                  <tr key={status.id}>
                    <td>{status.name}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEditStatus(status)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteStatus(status.id)}
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

export default StatusManagement;
