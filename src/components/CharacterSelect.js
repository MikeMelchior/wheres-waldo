import React from 'react'
import uniqid from 'uniqid'

export default function CharacterSelectWindow( { characters, clickCoordinates } ) {

  
  return (
    <div style={{position: 'absolute', top: clickCoordinates.y - 20, left: clickCoordinates.x - 20}}>
      <div className="tag-box"></div>
      <div className='character-selections'>
        {characters.map(character => {
          return (
            <div key={uniqid()} onClick={() => console.log(character)} className='character-selection'>
              <img id='character-selection-img' src={character.img} alt={character.name} />
              <p>{character.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
