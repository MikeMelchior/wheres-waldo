import { useState } from 'react';
import '../assets/styles.css'
import {
  apiKey, 
  authDomain, 
  projectId, 
  storageBucket, 
  messagingSenderId, 
  appId
} from '../assets/info'
import Puzzle from './Puzzle';
import Header from './Header';
import Footer from './Footer';
import SignInOrOut from './SignInOrOut';
import User from './User';
import HighScoreWindow from './HighScoreWindow';
import PuzzleSelectionPage from './PuzzleSelectionPage';
import { initializeApp } from "firebase/app";

const app = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
}

function App() {

    // start page state for choosing puzzle
  const [start, setStart] = useState(false);
    // set chosen puzzle in state
  const [puzzle, setPuzzle] = useState()
    // player set using google auth
  const [player, setPlayer] = useState()
    //if puzzle complete show high score window
  const [puzzleComplete, setPuzzleComplete] = useState(false)
    // data base ref to current game
  const [dbRefID, setdbRefID] = useState()
    // use to change character style in header once character is found (grey-out)
  const [characters, setCharacters] = useState([])

  return (
    <>
      {puzzleComplete && player
      ?
        <HighScoreWindow 
          player={player} 
          puzzle={puzzle} 
          dbRefID={dbRefID}
          setPuzzle={setPuzzle}
          setStart={setStart}
          setPuzzleComplete={setPuzzleComplete}
        />
      :
        <>
          { player 
          ?
            <div className='app'>
              <User player={player} setPlayer={setPlayer}/>
              <div className='app-div'>
                {start
                ?
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
                :
                  <PuzzleSelectionPage 
                    setStart={setStart}
                    setPuzzle={setPuzzle}
                  />
                }
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
