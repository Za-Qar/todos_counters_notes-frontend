//React
import { useContext, createContext, useState } from "react";

import { FirebaseAuthConsumer } from "@react-firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        return (
          <AuthContext.Provider value={[user]}>{children}</AuthContext.Provider>
        );
      }}
    </FirebaseAuthConsumer>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
