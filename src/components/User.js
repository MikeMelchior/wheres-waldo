import React from 'react'
import SignInOrOut from './SignInOrOut'

export default function User( { player, setPlayer } ) {

  return (
    <div className='player'>
      <SignInOrOut player={player} setPlayer={setPlayer} />
      <div className="user">
        <img id='player-image' src={player.photoURL} alt='player-avatar' />
        <p className='welcome'>Hello {player.displayName}!</p>
      </div>
      
    </div>
  )
}
