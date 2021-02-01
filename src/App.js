import React, { useState } from "react";
// import { render } from "react-dom";

import "firebase/auth";
import { IfFirebaseAuthedAnd } from "@react-firebase/auth";

// import {
//   FirebaseAuthProvider,
//   FirebaseAuthConsumer,
//   IfFirebaseAuthed,
//   IfFirebaseAuthedAnd,
// } from "@react-firebase/auth";

// import logo from "./logo.svg";

import "./App.css";

import "./components/nav/nav.css";

import Header from "./components/header";
import Counters from "./components/counters";
import TimeDate from "./components/timeDate";
import Weather from "./components/weather";
import Notes from "./components/notes";
import NasaPic from "./components/nasaPic";
import Login from "./components/login";
import Logout from "./components/logout";
import Test from "./components/test/test.js";

import Todos from "./components/todos";

//Font awesome
import "font-awesome/css/font-awesome.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [burgerClass, setBurgerClass] = useState("");

  function revealBurger() {
    burgerClass === "" ? setBurgerClass("responsive") : setBurgerClass("");
  }

  return (
    <div>
      <Router>
        <nav className="nav">
          <div className="container">
            <div className="navContainer">
              <ul className={`navUl ${burgerClass}`} onClick={revealBurger}>
                <li className="linkRouter">
                  <button className="icon">
                    <i className="fa fa-bars"></i>
                  </button>
                </li>
                <li>
                  <Link to="/" className="linkRouter">
                    <span>Todos</span>
                  </Link>
                </li>

                <li>
                  <Link to="/counter" className="linkRouter">
                    <span>Counters</span>
                  </Link>
                </li>

                <li>
                  <Link to="/notes" className="linkRouter">
                    <span>Notes</span>
                  </Link>
                </li>
                <li>
                  <Login />
                </li>
                <li>
                  <Logout />
                </li>

                <li>
                  <IfFirebaseAuthedAnd
                    filter={({ providerId }) => providerId !== "anonymous"}
                  >
                    {({ user }) => {
                      return (
                        <img
                          src={user.photoURL}
                          alt="user image"
                          className="authUserImage"
                        />
                      );
                    }}
                  </IfFirebaseAuthedAnd>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Header />
        <div className="container">
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ user }) => {
              return <p>Welcome {user.displayName}</p>;
            }}
          </IfFirebaseAuthedAnd>
        </div>

        <Switch>
          <Route path="/test">
            <Test />
          </Route>

          <Route path="/notes">
            <Notes />
          </Route>

          <Route path="/counter">
            <Counters />
          </Route>

          <Route path="/">
            <Todos />
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

// function nix() {
//   <FirebaseAuthProvider {...config} firebase={firebase}>
//           <div>
//             <button
//               onClick={() => {
//                 const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
//                 firebase.auth().signInWithPopup(googleAuthProvider);
//               }}
//             >
//               Sign In with Google
//             </button>
//             <button
//               data-testid="signin-anon"
//               onClick={() => {
//                 firebase.auth().signInAnonymously();
//               }}
//             >
//               Sign In Anonymously
//             </button>

//             <button
//               onClick={() => {
//                 firebase.auth().signOut();
//               }}
//             >
//               Sign Out
//             </button>

//             <FirebaseAuthConsumer>
//               {({ isSignedIn, user, providerId }) => {
//                 return (
//                   <pre style={{ height: 300, overflow: "auto" }}>
//                     {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
//                   </pre>
//                 );
//               }}
//             </FirebaseAuthConsumer>

//             <div>

//               <IfFirebaseAuthed>
//                 {() => {
//                   return <div>You are authenticated</div>;
//                 }}
//               </IfFirebaseAuthed>

//               <IfFirebaseAuthedAnd
//                 filter={({ providerId }) => providerId !== "anonymous"}
//               >
//                 {({ providerId }) => {
//                   return <div>You are authenticated with {providerId}</div>;
//                 }}
//               </IfFirebaseAuthedAnd>

//             </div>
//           </div>
//         </FirebaseAuthProvider>
//       </div>
//     </FirebaseAuthProvider>
// }
