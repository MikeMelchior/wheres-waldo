import { useEffect, useState } from 'react';
import { pictures } from '../puzzles/puzzlesData';
import '../assets/styles.css'
import Puzzle from './Puzzle';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [puzzle, setPuzzle] = useState()

  useEffect(() => {
    const puzzleNames = Object.keys(pictures)

    const randomPick = () => {
      let randomNum = Math.floor(Math.random() * puzzleNames.length)
      return puzzleNames[randomNum]
    } 
    
    setPuzzle(pictures[randomPick()])
  }, [])

  return (
    <div className='app'>

       
      {puzzle && 
      <div className="main">
        <Header puzzle={puzzle}/>
        <Puzzle puzzle={puzzle}/>
      </div>}
      <Footer />
    </div>
  );
}

export default App;
