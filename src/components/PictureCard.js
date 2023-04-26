import React from 'react'

export default function PictureCard( { puzzle } ) {
  


  return (
    <div className="picture-container">
      <img id='puzzle' src={puzzle.img} alt={puzzle.name} />
    </div>
  )
}
