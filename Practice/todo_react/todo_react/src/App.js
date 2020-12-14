import logo from "./logo.svg";
import "./App.css";

import "./components/nav/nav.css";

import Header from "./components/header";
import Nav from "./components/nav";
import Input from "./components/input";
import TimeDate from "./components/timeDate";
import Weather from "./components/weather";
import Notes from "./components/notes";
import NasaPic from "./components/nasaPic";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <nav className="nav">
          <div className="container">
            <ul className="navUl">
              <li>
                <Link to="/" className="linkRouter">
                  <span>Todos and counters</span>
                </Link>
              </li>
              <li>
                <Link to="/notes" className="linkRouter">
                  <span>Notes</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/">
            <Input />
          </Route>
        </Switch>
      </Router>

      <TimeDate />
      <Weather />
      <NasaPic />
    </div>
  );
}

export default App;

{
  /* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */
}
