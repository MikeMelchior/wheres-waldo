import React from 'react'

export default function Characters( { puzzle } ) {
  return (
    <div>
      {puzzle.possibleCharacters.map(character => {
        return (
          <div>
            <img id='character-avatar-header' src={character.img} alt={character.name} />
            <p>{character.name}</p>
          </div>
        )
      })}
    </div>
  )
}
