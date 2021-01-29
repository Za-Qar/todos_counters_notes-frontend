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

  // if (!userData) {

  // }

  return (
    <IfFirebaseAuthedAnd
      filter={({ providerId }) => providerId !== "anonymous"}
    >
      {({ user }) => {
        return (
          <AuthContext.Provider value={[user.email]}>
            {children}
          </AuthContext.Provider>
        );
      }}
    </IfFirebaseAuthedAnd>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
