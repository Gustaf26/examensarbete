import { createContext, useContext, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const auth = getAuth();

  // const generateToken = async () => {

  //   await fetch('http://127.0.0.1:8000/auth/generate-token', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res) {
  //         console.log(res)
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }

  const login = async (email, password) => {

    await fetch('http://127.0.0.1:8000/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          setCurrentUser({ email: res.email, uid: res.uid })
        }
        console.log(res)
      })
      .catch(err => console.log(err))

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

  const updateProfileData = async (email, password, display_name) => {

    await fetch('http://127.0.0.1:8000/auth/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: currentUser.uid, email, password, display_name }),
    })
      .then(res => res.json())
      .then(res => {
        return res.msg
      })
      .catch(err => console.log(err))
  };

  // const updatePassword = (password) => {
  //   return auth.currentUser.updatePassword(password);
  // };

  // const updateProfile = (name) => {
  //   return auth.currentUser.updateProfile({
  //     displayName: name,
  //   });
  // };

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
  }, [auth]);

  // useEffect(() => {
  //   const token = generateToken()
  //   if (token?.token) {
  //     localStorage.setItem(JSON.stringify({ token: token.token }))
  //   }
  // }, [])

  const contextValues = {
    currentUser,
    loading,
    admin,
    login,
    logout,
    resetPassword,
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

export { AuthContext, useAuth, AuthContextProvider as default };
