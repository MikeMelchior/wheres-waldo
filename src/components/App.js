import { useEffect, useState } from 'react';
import { pictures } from '../puzzles/puzzlesData';
import '../assets/styles.css'
import PictureCard from './PictureCard';
import Timer from './Timer';


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
    <>
      <Timer /> 
      {puzzle && <PictureCard puzzle={puzzle} />}
    </>
    
  );
}

export default App;
