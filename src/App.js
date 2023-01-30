import { useState } from 'react';
import './App.css';

// Square Component which takes an onClick event and value as props.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Main board function.
export default function Board() {
  // Checks if X plays next, default is true as X starts the game.
  const [xPlaysNext, setXPlaysNext] = useState(true);
  // States of our squares lifted to the parent component. Makes an array of nine members.
  // Fills all these members with null.
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Runs when a square is clicked. Passed to the each individual square via props.
  function handleClick(currentSquare) {
    // Makes a new array for the sake of immutability.
    const nextSquares = squares.slice();

    // If the square already has a value, return the function.
    // Also return if a player has already won.
    // Else, check the current player and set the square value accordingly using the index.
    if (squares[currentSquare] || calculateWinner(squares)) {
      return;
    } else if (xPlaysNext) {
      nextSquares[currentSquare] = 'X';
    } else {
      nextSquares[currentSquare] = 'O';
    }

    // Sets the changed squares and flips the current player boolean.
    setSquares(nextSquares);
    setXPlaysNext(!xPlaysNext);
  }

  // Shows the status and winner if applicable.
  const winner = calculateWinner(squares);
  let status;

  // Only works if the result of calculateWinner is not null.
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xPlaysNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Calculates the winner. Not specific to React.
function calculateWinner(squares) {
  // All the lines possible in the game.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Pick each line one by one. Check if the members in the lines are of the same value.
  // For example: const [a, b, c] is lines[i] and i=1 therefore [a, b, c] = [3, 4, 5]
  // If squares[3] = 'X' and squares[4] = 'X' and squares[5] = 'X', then X won.
  // Then return the value of squares[3] which is 'X'.
  // X has won.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
