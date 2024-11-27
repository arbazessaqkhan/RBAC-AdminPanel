import React from "react";
import { FaUsers, FaLock, FaTasks, FaChartBar } from "react-icons/fa"; // Importing some icons from react-icons

function Dashboard({ users, roles }) {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Dashboard</h1>
      
      <div className="row">
        {/* Total Users Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-sm h-100 border-light rounded">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h4 className="card-title text-muted">Total Users</h4>
                <h2 className="text-primary">{users.length}</h2>
              </div>
              <div>
                <FaUsers size={50} className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Roles Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-sm h-100 border-light rounded">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h4 className="card-title text-muted">Total Roles</h4>
                <h2 className="text-warning">{roles.length}</h2>
              </div>
              <div>
                <FaLock size={50} className="text-warning" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar for Task Completion */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-sm h-100 border-light rounded">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h4 className="card-title text-muted">Task Completion</h4>
                <h2 className="text-success">75%</h2>
                <div className="progress mt-3">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div>
                <FaTasks size={50} className="text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card with Charts */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-sm h-100 border-light rounded">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h4 className="card-title text-muted">Performance</h4>
                <h2 className="text-info">85%</h2>
                <div className="progress mt-3">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: "85%" }}
                    aria-valuenow="85"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div>
                <FaChartBar size={50} className="text-info" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row for additional stats or elements */}
      <div className="row mt-5">
        {/* Card for quick actions */}
        <div className="col-md-12">
          <div className="card shadow-sm border-light rounded">
            <div className="card-body">
              <h4 className="card-title text-muted">Quick Actions</h4>
              <div className="d-flex justify-content-around">
                <button className="btn btn-outline-primary">
                  Add User
                </button>
                <button className="btn btn-outline-warning">
                  Add Role
                </button>
                <button className="btn btn-outline-success">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
