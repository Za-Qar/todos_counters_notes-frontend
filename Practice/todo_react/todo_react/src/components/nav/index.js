import React from "react";

import "./nav.css";

function Nav() {
  return (
    <nav className="nav">
      <div className="container">
        <ul className="navUl">
          <li>
            <a>Todos</a>
          </li>
          <li>
            <a>Counters</a>
          </li>
        </ul>
        <img />
      </div>
    </nav>
  );
}

export default Nav;
