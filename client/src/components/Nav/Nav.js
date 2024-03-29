import React from "react";

function Nav() {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        About
      </a>
      <a className="navbar-brand" href="/todos">
        To Do List
      </a>
    </nav>
  );
}

export default Nav;
