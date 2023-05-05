import React, { useEffect, useState } from 'react'


export default function Timer() {
  const [time, setTime] = useState(0)

  let seconds = time % 60
  let minutes = Math.floor(time/60) % 60
  let hours = Math.floor(time/3600)

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
  

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((prev) => {
        return prev + 1;
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [time])
  
  

  return (
    <div className='timer'>
      <p>Time Spent Solving : {`${hours} : ${minutes} : ${seconds}`}</p>
    </div>
  )
}
