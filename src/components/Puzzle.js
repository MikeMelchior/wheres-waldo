import React, { useEffect, useState } from 'react'
import CharacterSelectWindow from './CharacterSelect'

export default function Puzzle( { puzzle, setCharacters } ) {
    // once puzzle has loaded, set characters to be used in header
  useEffect(() => {
    setCharacters(puzzle.possibleCharacters)
  }, [puzzle.possibleCharacters, setCharacters])

  const [remainingCharacters, setRemainingCharacters] = useState(puzzle.possibleCharacters)
  
    // set client click coords to style position of pop up window
  const [clientClickCoordinates, setClientClickCoordinates] = useState()

    // set coordinates of click event on puzzle to check for character
  const [puzzleClickX, setPuzzleClickX] = useState()
  const [puzzleClickY, setPuzzleClickY] = useState()

    // use to determine if click event should remove character select 'dropdown' menu
  const [characterSelectWindowShowing, setCharacterSelectWindowShowing] = useState(false)

  const handleClick = (e) => {
    // set click coordinates to pass to character selection popup window 
    setClientClickCoordinates({x: e.pageX, y: e.pageY})


    // allow 'click-off' to remove character select popup window 
    setCharacterSelectWindowShowing(current => !current)
    
    // use getBoundingClientRect() method to determine distance away from top & left
    // of screen and minus them from event.client x/y coordinates to determine click
    // location within the image
    let rect = e.target.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top

    setPuzzleClickX(x);
    setPuzzleClickY(y);
  }

      
  const checkCoordinatesForRemainingCharacter = (remainingCharacters, character) => {
    let x = puzzleClickX;
    let y = puzzleClickY;

    // use character object 'hit box' coordinates to determine if click event
    // coordinates fall within character 'hit box' in the image, if they do, 
    // assign the 'found' character to the foundCharacter variable
    let foundCharacter = remainingCharacters.find(char => {
      return (x > char.location.xMin 
            && x < char.location.xMax
            && y > char.location.yMin
            && y < char.location.yMax)
    })

    // if character has been found, update remainingCharacters state
    if (foundCharacter && foundCharacter === character) {
      setCharacters((current) => {
        let updatedCharacters = current.filter(char => char.name !== foundCharacter.name)
        foundCharacter.found = true;
        return [...updatedCharacters, foundCharacter]
      })
      alert(`you found ${foundCharacter.name}!`);
      setRemainingCharacters((previousRemainingCharacters) => {
        return previousRemainingCharacters.filter(character => character !== foundCharacter)
      })
    } else {
      alert(`That's not ${character.name}!`)
    }

    // hide selection window after checking if character found
    setCharacterSelectWindowShowing(false)
  }


  

  return (
    <div className="picture-container">
      {  characterSelectWindowShowing 
        && clientClickCoordinates !== undefined 
        && <CharacterSelectWindow 
        characters={remainingCharacters}
        remainingCharacters={remainingCharacters}
        clickCoordinates={clientClickCoordinates} 
        checkCoordinatesForRemainingCharacter={checkCoordinatesForRemainingCharacter}
      />}
      <img 
        id='puzzle' 
        src={puzzle.img} 
        alt={puzzle.name}
        onClick={handleClick}
      />
    </div>
  )
}
