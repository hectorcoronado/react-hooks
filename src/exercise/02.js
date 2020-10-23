// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useEffect, useRef, useState} from 'react'

// const useLocalStorage = (key, initialValue = '') => {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key)
//       return item ? JSON.parse(item) : initialValue
//     } catch (err) {
//       console.warn('Error setting localStorage:', err)
//       return initialValue
//     }
//   })

//   const setValue = value => {
//     try {
//       const valueToStore = 
//         value instanceof Function
//           ? value(storedValue)
//           : value
//       setStoredValue(valueToStore)
//       window.localStorage.setItem(key, JSON.stringify(valueToStore))
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   return [storedValue, setValue]
// }

const useLocalStorageState = (
  key,
  defaultValue = '',
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse
  } = {}) => {
    const [state, setState] = useState(
      () => {
        const valueInLocalStorage = window.localStorage.getItem(key)

        if (valueInLocalStorage) {
          return deserialize(valueInLocalStorage)
        }

        return typeof defaultValue === 'function' ? defaultValue() : defaultValue
      }
    )

    // keep track of key in case we need to change
    // how value is stored in localStorage
    const prevKeyRef = useRef(key)

    useEffect(() => {
      const prevKey = prevKeyRef.current

      if (prevKey !== key) {
        window.localStorage.removeItem(prevKey)
      }

      prevKeyRef.current = key

      window.localStorage.setItem(key, serialize(state))
    }, [key, serialize, state])

    return [state, setState]
}

const Greeting = ({initialName = ''}) => {
  const [name, setName] = useLocalStorageState('name', initialName)

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

const App = () => {
  return <Greeting />
}

export default App
