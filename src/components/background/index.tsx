"use client";

import styles from "./background.module.css";

export default function Background() {
  return (
    <div className={styles.main} aria-hidden="true">
      <div className={styles.content} />
    </div>
  );
}
