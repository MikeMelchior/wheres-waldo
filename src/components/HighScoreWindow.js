import { 
  query,
  collection,
  getFirestore,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc
  } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'



export default function HighScoreWindow( { player, puzzle, dbRefID, setPuzzle, setStart, setPuzzleComplete } ) {
  const [name, setName] = useState()
  const [submitted, setSubmitted] = useState(false)
  let docRef = doc(getFirestore(), `${puzzle.name}`, dbRefID)

  useEffect(() => {
    setName(player.displayName)
  },[player.displayName])



  function getScores() {
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(collection(getFirestore(), `${puzzle.name}`), orderBy('score', 'asc'), limit(8));
    
    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        let gameData = change.doc.data();
        if (gameData.nickname && gameData.score) createScoreDiv(gameData.nickname, gameData.score)
      });
    });
  }


  function createScoreDiv(name, score) {
    let element = document.createElement('div');
      element.classList.add('single-high-score')
    let nameElement = document.createElement('p');
      nameElement.textContent = name
    let scoreElement = document.createElement('p');
      scoreElement.textContent = score

    try {
      element.append(nameElement, scoreElement)
      document.querySelector('.scores-display').append(element)
    } catch(e) {
      console.log(e)
    }
    
  }



  const handleSubmit = () => {
    if (name === '') return alert('Please enter a name')

    try {
      updateDoc(docRef, {
        nickname: name
      })
    } catch (e) {
      console.log('Failed to update document: ', e)
    }

    setTimeout(() => {
      getScores()
      setName('')
      setSubmitted(true)
    }, 100)
  }

  const startNewGame = () => {
    setPuzzle(null)
    setStart(false)
    setPuzzleComplete(false)
  }

  return (
    <div className='high-score-window'>
      <h1>You Completed {`${puzzle.name.toUpperCase()}`} !</h1>
      {!submitted
      ?<>
        <label htmlFor='name'> Enter your name:
          <input 
            type="text" 
            id='name' 
            name='name' 
            value={`${name}`}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <button 
          onClick={handleSubmit} 
          disabled={submitted}
        >Submit</button>
      </>
      
      : 

        <div className="scores-display">
          <p>High Scores</p>
          <button onClick={startNewGame}>PLAY AGAIN</button>
        </div>

        
        
      }
      
      
      
    </div>
    
  )
}
