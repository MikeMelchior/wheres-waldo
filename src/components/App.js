import { useEffect, useState } from 'react';
import { pictures } from '../puzzles/puzzlesData';
import '../assets/styles.css'
import Puzzle from './Puzzle';
import Header from './Header';
import Footer from './Footer';
import SignInOrOut from './SignInOrOut';
import User from './User';
import HighScoreWindow from './HighScoreWindow';
import { initializeApp } from "firebase/app";



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
    // player set using google auth
  const [player, setPlayer] = useState()
    //if puzzle complete show high score window
  const [puzzleComplete, setPuzzleComplete] = useState(false)
    // data base ref to current game
  const [dbRefID, setdbRefID] = useState()

    // use to change character style in header once character is found (grey-out)
  const [characters, setCharacters] = useState([])

    // for now, randomly set puzzle, may add ability to select puzzle in future
  useEffect(() => {
    const puzzleNames = Object.keys(pictures)
    const randomPick = () => {
      let randomNum = Math.floor(Math.random() * puzzleNames.length)
      return puzzleNames[randomNum]
    } 
    setPuzzle(pictures[randomPick()])
  }, [])

  


  return (
    <>
      {puzzleComplete && player
      ?
        <HighScoreWindow 
          player={player} 
          puzzle={puzzle} 
          dbRefID={dbRefID}
        />
      :
        <>
          { player 
          ?
            <div className='app'>
              <SignInOrOut player={player} setPlayer={setPlayer} />
              <User player={player} />
              <div>
                <div>
                    {puzzle && 
                    <div className="main">
                      <Header puzzle={puzzle} characters={characters} />
                      <Puzzle 
                        puzzle={puzzle} 
                        setCharacters={setCharacters} 
                        player={player}
                        setPuzzleComplete={setPuzzleComplete}
                        dbRefID={dbRefID}
                        setdbRefID={setdbRefID}
                      />
                    </div>}
                </div>           
              </div>
              <Footer /> 
            </div>
          :
            <SignInOrOut player={player} setPlayer={setPlayer} />
          }
          
        </>
      }
      
    </>
    
  );
}
initializeApp(app)

export default App;
