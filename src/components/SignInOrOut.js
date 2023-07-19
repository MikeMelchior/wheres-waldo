import React from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from 'firebase/auth';

export default function SignInOrOut( { player, setPlayer } ) {

    // sign in using google auth
  async function signIn() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
    .then(res=>{
      setPlayer(getAuth().currentUser)
    })
  }

  function signOutUser() {
    signOut(getAuth());
    setPlayer(null)
  }

  function signInAsGuest() {
    setPlayer('guest')
  }

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
            <p>or</p>
            <button onClick={signInAsGuest}>Continue as Guest</button>
          </div>
        </div>
      }
    </>
  )
}
