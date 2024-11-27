import React from 'react';

function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Admin Dashboard</a>
      <div className="navbar-nav">
        <a 
          className={`nav-item nav-link ${currentPage === 'dashboard' ? 'active' : ''}`} 
          href="#"
          onClick={() => setCurrentPage('dashboard')}
        >
          Dashboard
        </a>
        <a 
          className={`nav-item nav-link ${currentPage === 'users' ? 'active' : ''}`} 
          href="#"
          onClick={() => setCurrentPage('users')}
        >
          Users
        </a>
        <a 
          className={`nav-item nav-link ${currentPage === 'permissions' ? 'active' : ''}`} 
          href="#"
          onClick={() => setCurrentPage('permissions')}
        >
          Permissions
        </a>
      </div>
    </nav>
  );
}

export default Navigation;
