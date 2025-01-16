import { createContext, useContext, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";




const AuthContext = createContext();
const auth = getAuth();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const login = async (email, password) => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user)
        setCurrentUser({ email: user.email, uid: user.uid, display_name: user.display_name, token: user.token })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ code: errorCode, msg: errorMessage })

      });

  };

  const logout = async (email) => {

    await signOut(auth, email).then((res) => {
      // Sign-out successful.
      setCurrentUser(null)
      setAdmin(false)
    }).catch((error) => {
      // An error happened.
    });

  };

  // const resetPassword = (email) => {
  //   return sendPasswordResetEmail(email);
  // };

  const signup = async (email, password) => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
        setCurrentUser({ email: user.email, uid: user.uid, display_name: user.display_name, token: user.token })

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log({ code: errorCode, msg: errorMessage })
      });


  };

  const updateProfileData = async (email, password, display_name) => {

    let message = await fetch('http://127.0.0.1:8000/auth/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: currentUser.uid, email, password, display_name }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.msg !== "") {
          setCurrentUser((prev) => { return { ...prev, email: res.email, uid: res.uid, display_name: res.display_name } })
        }
        return { msg: res.msg, error: res.error }
      })
      .finally(res => { return res })
      .catch(err => err)

    if (message) return message
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


  // This effect is responsible for keeping the "session" in the browser for the user
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
  }, [currentUser]);


  const contextValues = {
    currentUser,
    loading,
    admin,
    login,
    logout,
    // resetPassword,
    signup,
    updateProfileData,
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

export { useAuth, AuthContextProvider as default };
