import { createContext, useContext, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { getAuth, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const auth = getAuth();

  const login = async (email, password) => {

    let userEmail;

    await fetch('http://127.0.0.1:8000/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.email) {
          userEmail = res.email
        }
      })
      .catch(err => console.log(err))

    return userEmail
  };

  const logout = async (email) => {

    await fetch('http://127.0.0.1:8000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          setAdmin(false);
          setCurrentUser(null)
        }
      })
      .catch(err => console.log(err))
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(email);
  };

  const signup = async (email, password) => {

    await fetch('http://127.0.0.1:8000/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(res => {
        return res
      })
      .catch(err => console.log(err))

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
    setCurrentUser
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
