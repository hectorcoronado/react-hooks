// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import React, {useState} from 'react'

const Name = () => {
  const [name, setName] = useState('')

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

const FavoriteAnimal = ({animal, onAnimalChange}) => (
  <div>
    <label htmlFor="animal">Favorite Animal: </label>
    <input
      id="animal"
      value={animal}
      onChange={onAnimalChange}
    />
  </div>
)

// 🐨 uncomment this
const Display = ({animal}) => (
  <div>{`Your favorite animal is: ${animal}!`}</div>
)

const App = () => {
  const [animal, setAnimal] = useState('')

  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={e => setAnimal(e.target.value)} />
      <Display animal={animal} />
    </form>
  )
}

export default App
