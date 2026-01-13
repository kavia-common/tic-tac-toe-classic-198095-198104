import React from "react";
import Square from "./Square";
import styles from "./Board.module.css";

/**
 * Board renders a 3x3 grid of squares.
 */
// PUBLIC_INTERFACE
export default function Board({ squares, onPlaySquare, isGameOver }) {
  return (
    <div className={styles.board} role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => {
        const isDisabled = Boolean(value) || isGameOver;

        return (
          <div key={idx} role="gridcell" className={styles.cell}>
            <Square
              value={value}
              index={idx}
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) onPlaySquare(idx);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
