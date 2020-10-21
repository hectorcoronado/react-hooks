// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React, {useState} from 'react'

function Greeting(props) {
  console.log('props', props)
  const initialName = props.initialName || 'Brenda B.'

  console.log('initialName', initialName)
  const [name, setName] = useState(initialName)
  function handleChange(e) {
    // 🐨 update the name here based on event.target.value
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

function App() {
  const initialName = 'Hector C.'

  return <Greeting initialName={initialName} />
}

export default App
