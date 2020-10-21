// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useEffect, useState} from 'react'

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (err) {
      console.warn('Error setting localStorage:', err)
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore = 
        value instanceof Function
          ? value(storedValue)
          : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      console.error(err)
    }
  }
  return [storedValue, setValue]
}

const Greeting = ({initialName = ''}) => {
  const [name, setName] = useLocalStorage('name', initialName)

  useEffect(() => {
    setName(name)
  }, [name, setName])

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

const App = () => {
  return <Greeting />
}

export default App
