// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React, {useState} from 'react'

const Board = () => {
  const initialSquares = Array(9).fill(null)
  const [squares, setSquares] = useState(initialSquares)
  const [nextValue, setNextValue] = useState('X')
  const [winner, setWinner] = useState(null)
  const [status, setStatus] = useState(`Next player: ${nextValue}`)

  const selectSquare = square => {
    if ((squares[square] !== null) || winner) return

    // make copy of squares and fill square w/player that clicked:
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    
    const nextVal = calculateNextValue(squaresCopy)
    const winningPlayer = calculateWinner(squaresCopy)

    setSquares(squaresCopy)
    setNextValue(nextVal)
    setWinner(calculateWinner(squaresCopy))
    setStatus(calculateStatus(winningPlayer, squaresCopy, nextVal))
  }

  const restart = () => {
    setSquares(initialSquares)
    setWinner(null)
    setNextValue('X')
    setStatus('Next player: X')
  }

  const renderSquare = i => (
    <button className="square" onClick={() => selectSquare(i)}>
      {squares[i]}
    </button>
  )

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
  </div>
)

// eslint-disable-next-line no-unused-vars
const calculateStatus = (winner, squares, nextValue) => {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
const calculateNextValue = squares => {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const App = () => <Game />

export default App