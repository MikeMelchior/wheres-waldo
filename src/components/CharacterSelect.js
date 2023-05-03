import React from 'react'
import uniqid from 'uniqid'

export default function CharacterSelectWindow( { 
  clickCoordinates,
  remainingCharacters, 
  checkCoordinatesForRemainingCharacter } ) {

  
  return (
    <div style={{position: 'absolute', top: clickCoordinates.y - 35, left: clickCoordinates.x - 35}}>
      <div className="tag-box"></div>
      <div className='character-selections'>
        {remainingCharacters.map(character => {
          return (
            <div key={uniqid()} onClick={(e) => {
              (checkCoordinatesForRemainingCharacter(remainingCharacters, character))
            }} className='character-selection'>
              <img id='character-selection-img' src={character.img} alt={character.name} />
              <p className={`${character.name}`}>{character.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
