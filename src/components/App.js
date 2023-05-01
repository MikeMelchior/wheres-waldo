import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';


import { pictures } from '../puzzles/puzzlesData';
import '../assets/styles.css'
import Puzzle from './Puzzle';
import Header from './Header';
import Footer from './Footer';


import { initializeApp } from "firebase/app";




import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { getActiveElement } from '@testing-library/user-event/dist/utils';


const app = {
  apiKey: "AIzaSyCJb8aEDzzxWQ8LnzWYBUy9WYRU0FxFKLQ",
  authDomain: "waldo-59e4f.firebaseapp.com",
  projectId: "waldo-59e4f",
  storageBucket: "waldo-59e4f.appspot.com",
  messagingSenderId: "151993785441",
  appId: "1:151993785441:web:67e759685ca717b6f89e20"
}



 




function App() {
  const [puzzle, setPuzzle] = useState()
  const [player, setPlayer] = useState()

    // use to change character style in header once character is found (grey-out)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const puzzleNames = Object.keys(pictures)

    const randomPick = () => {
      let randomNum = Math.floor(Math.random() * puzzleNames.length)
      return puzzleNames[randomNum]
    } 
    
    setPuzzle(pictures[randomPick()])
  }, [])

  

  useEffect(() => {
    setPlayer(getAuth().currentUser)
  }, [])


  async function signIn() {
  let provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider)
  document.querySelector('.sign-in').classList.add('hidden')
  document.querySelector('.sign-out').classList.remove('hidden')
}

function signOutUser() {
  signOut(getAuth())
  document.querySelector('.sign-in').classList.remove('hidden')
  document.querySelector('.sign-out').classList.add('hidden')
}



function authStateObserver(user) {
  if (user) {
    setPlayer(user)
  } else {
    setPlayer(null)
  }
}
useEffect(() => {
  function initFirebaseAuth() {
    onAuthStateChanged(getAuth(), authStateObserver)
  }
  initFirebaseAuth()
},[])


  return (
    

      <div className='app'>
        <button className='sign-in' onClick={signIn}>Sign In With Google</button>
        <button className="sign-out hidden" onClick={signOutUser} >Sign Out</button>
        {player && <p className='welcome'>Hello {player.displayName}!</p>}
        <div>
          <div>
              {puzzle && 
              <div className="main">
                <Header puzzle={puzzle} characters={characters}/>
                <Puzzle puzzle={puzzle} setCharacters={setCharacters}/>
              </div>}
          </div>           
        </div>
        <Footer /> 
      </div>

  );
}
initializeApp(app)

export default App;
