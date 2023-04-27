import waldoAvatar from '../assets/waldo-avatar.png'
import beachPuzzle from './waldo-beach.jpg'



const pictures = {
  beach: {
    name: 'beach-puzzle',
    img: beachPuzzle,
    possibleCharacters: [
      {
        name: 'Waldo',
        img: waldoAvatar,
        location: {
          xMin: 660,
          xMax: 730,
          yMin: 609,
          yMax: 697
        }
      },
    ]
  },
}

export { pictures }