import React from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import { config } from "./components/config";

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
import Login from "./components/login";
import Logout from "./components/logout";

import Todos from "./components/todos";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <div className="loginStuff">
          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return console.log(
                JSON.stringify({ isSignedIn, user, providerId }, null, 2)
              );
            }}
          </FirebaseAuthConsumer>
        </div>

        <Router>
          <nav className="nav">
            <div className="container">
              <div className="navContainer">
                <ul className="navUl">
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
                  <li className="loginLi">
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
            <Route path="/notes">
              <Notes />
            </Route>

            <Route path="/counter">
              <Input />
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
    </FirebaseAuthProvider>
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
