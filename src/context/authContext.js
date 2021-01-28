//React
import { useContext, createContext, useState, useEffect } from "react";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);

  if (!userData) {
    <IfFirebaseAuthedAnd
      filter={({ providerId }) => providerId !== "anonymous"}
    >
      {({ user }) => {
        setUserData(user?.email);
      }}
    </IfFirebaseAuthedAnd>;
  }

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
