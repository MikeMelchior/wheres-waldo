import React, { useState } from 'react'

export default function PictureCard( { puzzle } ) {
  const [remainingCharacters, setRemainingCharacters] = useState(puzzle.possibleCharacters)

  const handleClick = (e) => {
    // use getBoundingClientRect() method to determine distance away from top & left
    // of screen and minus them from event.client x/y coordinates to determine click
    // location within the image
    let rect = e.target.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top

    console.log({x: x, y: y})
    
    checkCoordinatesForRemainingCharacter({x: x, y: y}, remainingCharacters)
  }

  const checkCoordinatesForRemainingCharacter = (coordinates, characterArray) => {
    // use character object 'hit box' coordinates to determine if click event
    // coordinates fall within character 'hit box' in the image, if they do, 
    // assign the 'found' character to the foundCharacter variable
    let foundCharacter = characterArray.find(char => {
      if (coordinates.x > char.location.xMin 
      && coordinates.x < char.location.xMax
      && coordinates.y > char.location.yMin
      && coordinates.y < char.location.yMax) {
        return char
      }
      return false
    })

    // if character has been found, update remainingCharacters state
    if (foundCharacter) {
      console.log(foundCharacter);
      setRemainingCharacters((previousRemainingCharacters) => {
        return previousRemainingCharacters.filter(character => character !== foundCharacter)
      })
    } 
  }

  return (
    <div className="picture-container">
      <p>Remaining Characters: {remainingCharacters.length}</p>
      <img 
        id='puzzle' 
        src={puzzle.img} 
        alt={puzzle.name}
        onClick={handleClick}
      />
    </div>
  )
}
