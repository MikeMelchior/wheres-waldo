import React, { useEffect }  from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

export default function Signup( { player, setPlayer } ) {
  
  
    // set player using google auth (firebase)
    useEffect(() => {
      setPlayer(getAuth().currentUser)
    }, [setPlayer])
  
      // sign in using google auth
    async function signIn() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
    document.querySelector('.sign-in').classList.add('hidden')
    document.querySelector('.sign-out').classList.remove('hidden')
    }

    function signOutUser() {
      signOut(getAuth())
    }
  
    useEffect(() => {
        // observe state change  of user
      function authStateObserver(user) {
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

  return (
    <>
      {player
      ?
      <button className="sign-out" onClick={signOutUser} >Sign Out</button>
      : 
      <div className='sign-in-page'>
        <div className="card">
          <h2>Sign in with your Google Account</h2>
          <button onClick={signIn}>Sign In</button>
        </div>
      </div>
      }
    </>
    
  )
}
