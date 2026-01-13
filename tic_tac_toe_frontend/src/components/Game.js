import React, { useMemo, useState } from "react";
import Board from "./Board";
import styles from "./Game.module.css";

const INITIAL_SQUARES = Array(9).fill(null);

function calculateWinner(squares) {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares) {
  return squares.every((s) => s !== null);
}

// PUBLIC_INTERFACE
export default function Game() {
  const [squares, setSquares] = useState(INITIAL_SQUARES);
  const [isXNext, setIsXNext] = useState(true);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = useMemo(() => !winner && isBoardFull(squares), [winner, squares]);
  const isGameOver = Boolean(winner) || isDraw;

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a draw";
    return `Next player: ${isXNext ? "X" : "O"}`;
  }, [winner, isDraw, isXNext]);

  // PUBLIC_INTERFACE
  function handlePlaySquare(index) {
    // Defensive: ignore interaction if game over or square already filled.
    if (isGameOver || squares[index]) return;

    const next = squares.slice();
    next[index] = isXNext ? "X" : "O";
    setSquares(next);
    setIsXNext((v) => !v);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setSquares(INITIAL_SQUARES);
    setIsXNext(true);
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-label="Tic Tac Toe game">
        <header className={styles.header}>
          <h1 className={styles.title}>Tic Tac Toe</h1>
          <p
            className={`${styles.status} ${
              winner ? styles.statusSuccess : isDraw ? styles.statusMuted : ""
            }`}
            role="status"
            aria-live="polite"
          >
            {statusText}
          </p>
        </header>

        <div className={styles.boardWrap}>
          <Board squares={squares} onPlaySquare={handlePlaySquare} isGameOver={isGameOver} />
        </div>

        <footer className={styles.footer}>
          <div className={styles.resultRow} aria-label="Game controls">
            <button
              type="button"
              className={styles.restartButton}
              onClick={handleRestart}
              aria-label="Restart game"
            >
              Restart
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
