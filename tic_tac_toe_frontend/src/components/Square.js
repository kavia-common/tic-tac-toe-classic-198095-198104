import React from "react";
import styles from "./Square.module.css";

/**
 * Square is a single board cell rendered as a button.
 * It is disabled when already filled or when the game is finished.
 */
// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, index }) {
  /** Provide an accessible label describing position and current value. */
  const ariaLabel = `Square ${index + 1}${value ? `: ${value}` : ": empty"}`;

  return (
    <button
      type="button"
      className={styles.square}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className={styles.value} aria-hidden="true">
        {value}
      </span>
    </button>
  );
}
