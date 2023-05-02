import React from 'react'
import uniqid from 'uniqid'

export default function Characters( { puzzle, characters } ) {

  return (
    <div>
      {characters.map(character => {
        return (
          <div 
            className='character-header' 
            key={uniqid()} 
            style={{opacity: character.found ? 0.2 : 1}}
          >
            <img id='character-avatar-header' src={character.img} alt={character.name} />
            <p>{character.name}</p>
          </div>
        )
      })}
    </div>
  )
}
