import React, { useEffect, useState }  from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

export default function SignInOrOut( { player, setPlayer } ) {
  const [loading, setLoading] = useState(true)

  // set player using google auth (firebase)
  useEffect(() => {
    setPlayer(getAuth().currentUser)
  }, [setPlayer])

  useEffect(() => {
      // observe state change of user
    function authStateObserver(user) {
      setTimeout(() => {
        setLoading(false)
      }, 500);
      if (user) {
        setPlayer(user)
      } else {
        setPlayer(null)
      }

    }

    function initFirebaseAuth() {
      onAuthStateChanged(getAuth(), authStateObserver)
    }
    initFirebaseAuth()
  },[player, setPlayer])

    // sign in using google auth
  async function signIn() {
  let provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider)
  }

  function signOutUser() {
    signOut(getAuth())
  }



  return (
    <>
      {player
      ?
        <button className="sign-out" onClick={signOutUser} >Sign Out</button>
      : 
        <>
          {loading
          ?
            <div className='loading'>Loading . . .</div>
          :
            <div className='sign-in-page'>
              <div className="card">
                <h2>Sign in with your Google Account</h2>
                <button onClick={signIn}>Sign In</button>
              </div>
            </div>
          }
        </>
      }
    </>
  )
}
