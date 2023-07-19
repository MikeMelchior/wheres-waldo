import React, { useEffect } from 'react'
import { pictures } from '../puzzles/puzzlesData'
import uniqid from 'uniqid'

export default function PuzzleSelectionPage( { setStart, setPuzzle } ) {
    // set flex on parent element to stretch to page
  useEffect(() => {
    styleParent()
  }, [])
  
  const styleParent = () => {
    setTimeout(() => {
      document.querySelector('.app-div').style.flex = 1
    }, 1)
  }

  const startGame = (puzzle) => {
    setPuzzle(puzzle)
    setStart(true)
  }
  
  return (
    <>
      <h2 className='puzzle-select-header'>Select a puzzle:</h2>
      <div className='puzzle-selection-page' >
          {Object.keys(pictures).map(puzzle => {
            return (
              <div 
                key={uniqid()} 
                className="puzzle-selection-card"
                onClick={() => startGame(pictures[puzzle])}
              >
                <h3>{pictures[puzzle].name}</h3>
                <p>{`(${pictures[puzzle].difficulty})`}</p>
                <img src={pictures[puzzle].img} alt={pictures[puzzle].name} />
              </div>
            )
          })}
      </div>
    </>
    
  )
}
