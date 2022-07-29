import React from "react";
import Logo from "../logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <img src={Logo} alt="logo" height={"40px"} />
          &nbsp; <strong>Approval Tool</strong>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
