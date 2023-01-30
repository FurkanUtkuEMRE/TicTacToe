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

// Board Component which is used by the Game Component.
function Board({ xPlaysNext, squares, onPlay }) {
  // Runs when a square is clicked. Passed to the each individual square via props.
  function handleClick(currentSquare) {
    // If the square already has a value, return the function.
    // Also return if a player has already won.
    if (squares[currentSquare] || calculateWinner(squares)) {
      return;
    }

    // Makes a new array for the sake of immutability.
    const nextSquares = squares.slice();

    // Check the current player and set the square value accordingly using the index.
    if (xPlaysNext) {
      nextSquares[currentSquare] = 'X';
    } else {
      nextSquares[currentSquare] = 'O';
    }

    // Passed to the Game Component's 'handlePlay' via props to do the game logic.
    onPlay(nextSquares);
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

export default function Game() {
  // Holds the history of all the states which the squares went through.
  // Nine member array is set as default under another array to keep check of all the history.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // Holds the information for the current move, used for traveling to previous moves.
  const [currentMove, setCurrentMove] = useState(0);

  // Gets the current squares by getting the history member for the currentMove.
  const currentSquares = history[currentMove];
  // Checks if the X plays next by checking if the current move is even or odd.
  const xPlaysNext = currentMove % 2 === 0;

  // Runs when any square is clicked.
  function handlePlay(nextSquares) {
    // Store the next history using the currentMove.
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // Sets the new squares to the history array and also keeps the previous arrays intact depending on the current move.
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    // Current move is the move that is chosen by the user.
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xPlaysNext={xPlaysNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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
