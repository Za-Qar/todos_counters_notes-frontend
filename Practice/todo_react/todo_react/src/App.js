import logo from "./logo.svg";
import "./App.css";

import Header from "./components/header";
import Nav from "./components/nav";
import Input from "./components/input";
import TimeDate from "./components/timeDate";
import Weather from "./components/weather";

function App() {
  return (
    <div>
      <Nav />
      <Header />
      <Input />
      <TimeDate />
      <Weather />
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
