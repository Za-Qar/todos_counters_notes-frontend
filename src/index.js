import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Context
import { UserProvider } from "./context/userContext.js";

//Auth provider
import { AuthProvider } from "./context/authContext.js";

import { FirebaseAuthProvider } from "@react-firebase/auth";
import { config } from "./configs/configs";
import firebase from "firebase/app";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
