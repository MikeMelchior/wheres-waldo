import React, { useState } from 'react'

export default function PictureCard( { puzzle } ) {
  const [coordinates, setCoordinates] = useState({})
  

  const setClickCoordinates = (e) => {
    let rect = e.target.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top
    
    setCoordinates({x: x, y: y})
  }

  return (
    <div className="picture-container">
      <img 
        id='puzzle' 
        src={puzzle.img} 
        alt={puzzle.name}
        onClick={(e) => setClickCoordinates(e)}
      />
    </div>
  )
}
