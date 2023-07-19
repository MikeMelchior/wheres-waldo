import React from 'react'
import SignInOrOut from './SignInOrOut'

export default function User( { player, setPlayer } ) {

  return (
    <div className='player'>
      <SignInOrOut player={player} setPlayer={setPlayer} />
      <div className="user">
        {player.photoURL && <img id='player-image' src={player.photoURL} alt='player-avatar' />}
        <p className='welcome'>Hello {player.displayName ? player.displayName : 'Guest'}!</p>
      </div>
      
    </div>
  )
}
