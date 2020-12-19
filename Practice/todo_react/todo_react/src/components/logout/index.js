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
import { config } from "../config";

function Logout() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <IfFirebaseAuthed>
        {() => {
          return (
            <button
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Sign Out
            </button>
          );
        }}
      </IfFirebaseAuthed>
    </FirebaseAuthProvider>
  );
}

export default Logout;
