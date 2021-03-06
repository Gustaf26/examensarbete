import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { BounceLoader } from "react-spinners";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    setAdmin(false);
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const updateEmail = (email) => {
    return auth.currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return auth.currentUser.updatePassword(password);
  };

  const updateProfile = (name) => {
    return auth.currentUser.updateProfile({
      displayName: name,
    });
  };

  const checkIfAdmin = (email) => {
    if (email.trim() === "gcs26@yahoo.com") {
      setAdmin(true);
      return true;
    } else {
      setAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // auth state changed (by a user either logging in or out)
      setCurrentUser(user);
      if (user) {
        checkIfAdmin(user.email);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const contextValues = {
    currentUser,
    loading,
    admin,
    login,
    logout,
    resetPassword,
    signup,
    updateEmail,
    updatePassword,
    updateProfile,
    checkIfAdmin,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <BounceLoader color={"#888"} size={100} />
        </div>
      )}
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuth, AuthContextProvider as default };
