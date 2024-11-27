/** @jsxImportSource https://esm.sh/react */
import React, { useState } from "https://esm.sh/react";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import StatusManagement from "./components/StatusManagement";
import PermissionManagement from "./components/PermissionManagement";
import { INITIAL_ROLES } from "./utils/constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles.css";
import { FaUsers, FaLock, FaTasks, FaChartBar } from "react-icons/fa"; // Importing icons

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "admin@example.com", roleId: 1, status: "Active", permissions: ["read", "write"] },
    { id: 2, username: "manager", email: "manager@example.com", roleId: 2, status: "Inactive", permissions: ["read"] },
  ]);

  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [statuses, setStatuses] = useState([
    { id: 1, name: "Active" },
    { id: 2, name: "Inactive" },
  ]);
  const [permissions, setPermissions] = useState([
    { id: 1, name: "read" },
    { id: 2, name: "write" },
    { id: 3, name: "update" },
    { id: 4, name: "delete" },
  ]);
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard users={users} roles={roles} />;
      case "users":
        return <UserManagement users={users} setUsers={setUsers} roles={roles} statuses={statuses} permissions={permissions} />;
      case "roles":
        return <RoleManagement roles={roles} setRoles={setRoles} />;
      case "statuses":
        return <StatusManagement statuses={statuses} setStatuses={setStatuses} users={users} setUsers={setUsers} />;
      case "permissions":
        return <PermissionManagement permissions={permissions} setPermissions={setPermissions} users={users} setUsers={setUsers} />;
      default:
        return <Dashboard users={users} roles={roles} />;
    }
  };

  return (
    <div className="admin-panel">
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Admin Panel</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse shadow-sm">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                {/* Dashboard */}
                <li className={`nav-item ${activeSection === "dashboard" ? "active-nav" : ""}`}>
                  <a
                    href="#"
                    className="nav-link d-flex align-items-center"
                    onClick={() => setActiveSection("dashboard")}
                  >
                    <span className="me-2"><FaChartBar /></span> Dashboard
                  </a>
                </li>

                {/* User Management */}
                <li className={`nav-item ${activeSection === "users" ? "active-nav" : ""}`}>
                  <a
                    href="#"
                    className="nav-link d-flex align-items-center"
                    onClick={() => setActiveSection("users")}
                  >
                    <span className="me-2"><FaUsers /></span> User Management
                  </a>
                </li>

                {/* Role Management */}
                <li className={`nav-item ${activeSection === "roles" ? "active-nav" : ""}`}>
                  <a
                    href="#"
                    className="nav-link d-flex align-items-center"
                    onClick={() => setActiveSection("roles")}
                  >
                    <span className="me-2"><FaLock /></span> Role Management
                  </a>
                </li>

                {/* Status Management */}
                <li className={`nav-item ${activeSection === "statuses" ? "active-nav" : ""}`}>
                  <a
                    href="#"
                    className="nav-link d-flex align-items-center"
                    onClick={() => setActiveSection("statuses")}
                  >
                    <span className="me-2"><FaTasks /></span> Status Management
                  </a>
                </li>

                {/* Permission Management */}
                <li className={`nav-item ${activeSection === "permissions" ? "active-nav" : ""}`}>
                  <a
                    href="#"
                    className="nav-link d-flex align-items-center"
                    onClick={() => setActiveSection("permissions")}
                  >
                    <span className="me-2"><FaLock /></span> Permission Management
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">{renderSection()}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
