import React from "react";
import styles from "./Style.module.css";

function RatingTile({ title, value }) {
  return (
    <div className={styles.RatingWrap}>
      <div>{title}</div>
      <div className={styles.value}>{value} </div>
    </div>
  );
}

export default RatingTile;
