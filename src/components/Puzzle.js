import React, { useEffect, useState } from 'react'
import CharacterSelectWindow from './CharacterSelect'

import { getAuth } from 'firebase/auth'

import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  getFirestore, 
  doc,
  getDoc,
  updateDoc,
  } from 'firebase/firestore'

const getUserName = () => {
  return getAuth().currentUser.displayName
}


export default function Puzzle( { puzzle, setCharacters, setPuzzleComplete, dbRefID, setdbRefID } ) {

    // once puzzle has loaded, set characters to be used in header
  useEffect(() => {
    setCharacters(puzzle.possibleCharacters)
  }, [puzzle.possibleCharacters, setCharacters])

  const [remainingCharacters, setRemainingCharacters] = useState(puzzle.possibleCharacters)

    // set client click coords to style position of pop up window
  const [clientClickCoordinates, setClientClickCoordinates] = useState()

    // set coordinates of click event on puzzle to check for character
  const [puzzleClickX, setPuzzleClickX] = useState()
  const [puzzleClickY, setPuzzleClickY] = useState()

    // use to determine if click event should remove character select 'dropdown' menu
  const [characterSelectWindowShowing, setCharacterSelectWindowShowing] = useState(false)

  
    // Saves a new timestamp on the Cloud Firestore.
  async function addGameToDatabase() {
    // Add a new timestamp entry to the Firebase database.
    try {
      let ref = await addDoc(collection(getFirestore(), `${puzzle.name}`), {
        name: getUserName(),
        startTime: serverTimestamp()
      });
      setdbRefID(ref.id)
    }
    catch(error) {
      console.error('Error writing new score to Firebase Database', error);
    }
  }

  async function setScoreOnDatabase() {
    let docRef = doc(getFirestore(), `${puzzle.name}`, dbRefID);

    const docSnap = await getDoc(docRef);
    let startTimeInteger = docSnap.data().startTime.seconds + (docSnap.data().startTime.nanoseconds / 1_000_000_000)
    let finishTimeInteger = docSnap.data().finishTime.seconds + (docSnap.data().finishTime.nanoseconds / 1_000_000_000)
    let scoreTimeInSeconds = finishTimeInteger - startTimeInteger;
    let hours = Math.floor(scoreTimeInSeconds / 3600)
    let minutes = Math.floor((scoreTimeInSeconds % 3600) / 60)
    let seconds = Math.floor((scoreTimeInSeconds % 3600) % 60)

    const addZero = (num) => {
      let addZeroUsingArray = ['0'];
      addZeroUsingArray.push(num.toString())
      let result = addZeroUsingArray.join('')
      return result
    }

    if (seconds.toString().length === 1) {
      seconds = addZero(seconds)
    }
    if (minutes.toString().length === 1) {
      minutes = addZero(minutes)
    } 
    if (hours.toString().length === 1) {
      hours = addZero(hours)
    }

    try {
      updateDoc(docRef, {
        score: `${hours}:${minutes}:${seconds}`
      })
    } catch (e) {
      console.log('Failed to update document: ', e)
    }
  }


  const handleClick = (e) => {
    // set click coordinates to pass to character selection popup window 
    setClientClickCoordinates({x: e.pageX, y: e.pageY})

    // allow 'click-off' to remove character select popup window 
    setCharacterSelectWindowShowing(current => !current)
    
    // use getBoundingClientRect() method to determine distance away from top & left
    // of screen and minus them from event.client x/y coordinates to determine click
    // location within the image
    let rect = e.target.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top

    setPuzzleClickX(x);
    setPuzzleClickY(y);
  }

  const checkCoordinatesForRemainingCharacter = (remainingCharacters, character) => {
    let x = puzzleClickX;
    let y = puzzleClickY;

    // use character object 'hit box' coordinates to determine if click event
    // coordinates fall within character 'hit box' in the image, if they do, 
    // assign the 'found' character to the foundCharacter variable
    let foundCharacter = remainingCharacters.find(char => {
      return (x > char.location.xMin 
            && x < char.location.xMax
            && y > char.location.yMin
            && y < char.location.yMax)
    })

    // if character has been found, update remainingCharacters state
    if (foundCharacter && foundCharacter === character) {

        // if puzzle completed, add finish time to database document
      if (noCharactersRemain) {
        let docRef = doc(getFirestore(), `${puzzle.name}`, dbRefID)
        try {
          updateDoc(docRef, {
            finishTime: serverTimestamp()
          })
          setScoreOnDatabase()
          setTimeout(() => {
            setPuzzleComplete(true)
          }, 500);
        } catch (e) {
          console.log('Failed to update document: ', e)
        }
      }

        // update characters to style header
      setCharacters((current) => {
        let updatedCharacters = current.filter(char => char.name !== foundCharacter.name)
        foundCharacter.found = true;
        return [...updatedCharacters, foundCharacter]
      })
      alert(`you found ${foundCharacter.name}!`);
      setRemainingCharacters((previousRemainingCharacters) => {
        return previousRemainingCharacters.filter(character => character !== foundCharacter)
      })

      return true;
    } else {
      alert(`That's not ${character.name}!`)
    }

    // hide selection window after checking if character found
    setCharacterSelectWindowShowing(false)
  }

  const noCharactersRemain = () => {
    return remainingCharacters.length === 0;
  }

  
  

  return (
    <>
        <div className="picture-container">
          {characterSelectWindowShowing 
            && clientClickCoordinates !== undefined 
            && <CharacterSelectWindow 
            remainingCharacters={remainingCharacters}
            clickCoordinates={clientClickCoordinates} 
            checkCoordinatesForRemainingCharacter={checkCoordinatesForRemainingCharacter}
          />}
          <img 
            id='puzzle' 
            src={puzzle.img} 
            alt={puzzle.name}
            onClick={handleClick}
            onLoad={addGameToDatabase}
          />
        </div>
    </>
  )
}
