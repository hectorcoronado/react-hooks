// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React, {useState} from 'react'

const Greeting = (props) => {
  const initialName = props.initialName || 'Brenda B.'
  const [name, setName] = useState(initialName)
  function handleChange(e) {
    let name = e.target.value
    setName(name)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" defaultValue={initialName} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

const App = () => {
  const initialName = 'Hector C.'
  return <Greeting initialName={initialName} />
}

export default App
