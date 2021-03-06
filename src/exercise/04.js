// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React, {useEffect, useState} from 'react'
import {useLocalStorageState} from '../utils'

const Board = ({selectSquare, squares}) => {
  const renderSquare = i => (
    <button className="square" onClick={() => selectSquare(i)}>
      {squares[i]}
    </button>
  )

  return (
    <div>
      {/* <div className="status">{status}</div> */}
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
      {/* <button className="restart" onClick={restart}>
        restart
      </button> */}
    </div>
  )
}

const Game = () => {
  const initialSquares = Array(9).fill(null)
  const [squares, setSquares] = useState(initialSquares)
  const [nextValue, setNextValue] = useState('X')
  const [winner, setWinner] = useState(null)
  const [status, setStatus] = useState(`Next player: ${nextValue}`)
  const [gameState, setGameState] = useLocalStorageState('ticTacToeState', null)
  const [history, setHistory] = useState([])
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (gameState === null) {
      return
    } else {
      setSquares(gameState.squares)
      setNextValue(gameState.nextValue)
      setWinner(gameState.winner)
      setStatus(gameState.status)
    }
  }, [])

  const selectSquare = square => {
    if ((squares[square] !== null) || winner) return

    // make copy of squares and fill square w/player that clicked:
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    
    const nextVal = calculateNextValue(squaresCopy)
    const winningPlayer = calculateWinner(squaresCopy)
    const gameStatus = calculateStatus(winningPlayer, squaresCopy, nextVal)
    const gameStateToStore = {
      squares: squaresCopy,
      nextValue: nextVal,
      winner: winningPlayer,
      status: gameStatus
    }

    setSquares(squaresCopy)
    setNextValue(nextVal)
    setWinner(winningPlayer)
    setStatus(gameStatus)
    setGameState(gameStateToStore)
  }

  const restart = () => {
    setGameState(null)
    setSquares(initialSquares)
    setWinner(null)
    setNextValue('X')
    setStatus('Next player: X')
  }

  const moves = history => history.map((stepSquares, step) => {
    if (step === 0) {
      return <li>{`Go to game start`}</li>
    }
  })

  const goToStep = e => console.log('e.target', e.target)

  return (
    <div className="game">
    <div className="game-board">
      <Board onClick={selectSquare} squares={squares} />
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
    <div className="game-info" onClick={goToStep}>
      <div>{status}</div>
      {/* <ol>{moves}</ol> */}
    </div>
  </div>
)}

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