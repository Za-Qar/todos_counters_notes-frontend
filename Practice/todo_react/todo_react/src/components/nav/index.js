import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "../header";
import Input from "../input";
import TimeDate from "../timeDate";
import Weather from "../weather";
import Notes from "../notes";
import NasaPic from "../nasaPic";

import "./nav.css";
import "../../App.css";

function Nav() {
  return (
    <Router>
      <nav className="nav">
        <div className="container">
          <ul className="navUl">
            <li>
              <Link to="/">Todos and counters</Link>
            </li>
            <li>
              <Link to="/about">Notes</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/users">
          <Notes />
        </Route>
        <Route path="/">
          <Input />
        </Route>
      </Switch>
    </Router>
  );
}

export default Nav;
