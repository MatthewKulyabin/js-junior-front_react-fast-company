import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="nav">
      <Link to="/main" className="nav-link active">
        Main
      </Link>
      <Link to="/login" className="nav-link active">
        Login
      </Link>
      <Link to="/users" className="nav-link active">
        Users
      </Link>
    </nav>
  );
};

export default NavBar;
