import beachPuzzle from './waldo-beach.jpg'
import waldoAvatar from '../assets/waldo-avatar.png'

import festival from './festival-wheres-waldo.jpg'
import bush_guy from '../assets/guy-in-hedge.png'
import scared_tiger from '../assets/scared-tiger.png'
import bearded_guy from '../assets/bearded-guy.png'

import winterWaldo from './waldo-winter.jpg'

const pictures = {
  beach: {
    name: 'Beach Waldo',
    difficulty: 'easy',
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
  rockFestival: {
    name: 'Rock Festival',
    difficulty: 'hard',
    img: festival,
    possibleCharacters: [
      {
        name: 'bush guy',
        img: bush_guy,
        location: {
          xMin: 711,
          xMax: 726,
          yMin: 640,
          yMax: 657
        }
      },
      {
        name: 'scared tiger',
        img: scared_tiger,
        location: {
          xMin: 1220,
          xMax: 1241,
          yMin: 494,
          yMax: 523
        }
      },
      {
        name: 'bearded guy',
        img: bearded_guy,
        location: {
          xMin: 310,
          xMax: 325,
          yMin: 193,
          yMax: 217
        }
      }
    ]
  },
  winter: {
    name: 'Winter Waldo',
    difficulty: 'medium',
    img: winterWaldo,
    possibleCharacters: [
      {
        name: 'Waldo',
        img: waldoAvatar,
        location: {
          xMin: null,
          xMax: null,
          yMin: null,
          yMax: null
        }
      },
    ]
  }

}

export { pictures }