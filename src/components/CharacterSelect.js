import React from 'react'

export default function CharacterSelectWindow( { characters } ) {
  return (
    <div className='character-select-window'>
      {characters.map(character => {
        return (
          <div onClick={() => console.log(character)} className='character-selection'>
            <img id='character-selection-img' src={character.img} alt={character.name} />
            <p>{character.name}</p>
          </div>
        )
      })}
    </div>
  )
}
