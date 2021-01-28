//React
import { useContext, createContext, useState } from "react";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);

  return (
    <AuthContext.Provider value={[authUser, loading, error]}>
      <IfFirebaseAuthedAnd
        filter={({ providerId }) => providerId !== "anonymous"}
      >
        {({ user }) => {
          setUserData(user?.email);
        }}
      </IfFirebaseAuthedAnd>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
