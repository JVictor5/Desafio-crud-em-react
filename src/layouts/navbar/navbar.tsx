import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="cont">
        <i className="bi bi-box bi-2x icon"></i>
        <span className="brand">ProductManager</span>
      </div>
    </nav>
  );
};

export default Navbar;
