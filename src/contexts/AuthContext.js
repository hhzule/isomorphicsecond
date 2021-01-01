import React, { useContext, useState, useEffect, createContext } from "react"
import { auth, storage, } from "../firebase"
import firebase from 'firebase'

export const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0)


  function signup(email, password) {
    try {
      return auth.createUserWithEmailAndPassword(email, password)
    } catch (e) {
      console.log(e, "error")
      console.log(progress)
    }

  }

  function profile(displayName) {
    try {
      return auth.currentUser.updateProfile({
        displayName
      })
    } catch (e) {
      console.log(e, "error")
    }

  }
  const picstorage = (imageAsFile) => {
    try {

      const upload = storage.ref(`users/${currentUser?.uid}/${currentUser.displayName}`).put(imageAsFile)
      upload.on('state_changed',
        (snapShot) => {
          const progress = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          );
          setProgress(progress)
        }, (err) => {
          console.log(err)
        }, () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage.ref(`users/${currentUser?.uid}`).child(currentUser.displayName).getDownloadURL()
            .then(fireBaseUrl => {
              auth.currentUser.updateProfile({
                photoURL: fireBaseUrl
              })
              setUrl(fireBaseUrl)
            })
        })


    } catch (e) {
      console.log(e, "error in file creation", e.message)
    }

  }


  function loginwithgoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider)
  }

  function loginwithfacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    return auth.signInWithPopup(provider)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {


    const unsubscribe = auth.onAuthStateChanged(user => {
      // console.log(user, "user")
      setCurrentUser(user)
      setLoading(false)
      if (user) {
        setUrl(user.photoURL)
      }

      // console.log(url)
    })

    return unsubscribe
  }, [])

  // console.log(url, "fom auth")

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    loginwithgoogle,
    loginwithfacebook,
    profile,
    picstorage,
    setUrl,
    url
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
