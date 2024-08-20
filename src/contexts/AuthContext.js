import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
import { BounceLoader } from "react-spinners";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const auth = getAuth();


  const login = (email, password) => {

    let userLoggingIn;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        userLoggingIn = userCredential.user;
        return userLoggingIn
        // ...
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const logout = () => {
    setAdmin(false);
    signOut(auth).then(() => {
      // Sign-out successful.
      setCurrentUser(null)
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(email);
  };

  const signup = (email, password) => {

    let newUser;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        newUser = userCredential.user;
        return newUser;
      })
      .catch((error) => {
        console.log(error)
      }
      )

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
