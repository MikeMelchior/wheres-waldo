import React from 'react'

export default function User( { player } ) {
  return (
    <div className='player'>
      <img id='player-image' src={player.photoURL} alt={player.displayName} />
      <p className='welcome'>Hello {player.displayName}!</p>
    </div>
  )
}
