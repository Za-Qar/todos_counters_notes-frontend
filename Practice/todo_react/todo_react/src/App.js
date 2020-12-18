import * as React from "react";
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

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <div className="loginStuff">
          <button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
            }}
          >
            Sign In with Google
          </button>

          <button
            data-testid="signin-anon"
            onClick={() => {
              firebase.auth().signInAnonymously();
            }}
          >
            Sign In Anonymously
          </button>

          <button
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Sign Out
          </button>

          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return (
                <pre style={{ height: 300, overflow: "auto" }}>
                  {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                </pre>
              );
            }}
          </FirebaseAuthConsumer>

          <IfFirebaseAuthed>
            {() => {
              return <div>You are authenticated</div>;
            }}
          </IfFirebaseAuthed>

          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
          </IfFirebaseAuthedAnd>
        </div>

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
