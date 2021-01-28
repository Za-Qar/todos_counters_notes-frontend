import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider, IfFirebaseAuthed } from "@react-firebase/auth";
import { config } from "../../configs/configs";

import "./logout.css";

function Logout() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <IfFirebaseAuthed>
        {() => {
          return (
            <span
              onClick={() => {
                firebase.auth().signOut();
              }}
              className="loginButton"
            >
              Logout
            </span>
          );
        }}
      </IfFirebaseAuthed>
    </FirebaseAuthProvider>
  );
}

export default Logout;
