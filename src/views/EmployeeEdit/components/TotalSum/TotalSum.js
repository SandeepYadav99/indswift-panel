import React from "react";
import styles from "./Style.module.css";

function TotalSum({ firstName, firstAmount, secondName, secondAmount ,reduceAmount}) {
  return (
    <div className={styles.TotalSumWrapper}>
      <div className={styles.topWrapper}>
        <span className={styles.nameFonts}>{firstName}</span>
        <span className={styles.amountFonts}>{firstAmount}</span>
        <span className={styles.reductionFonts}>{reduceAmount}</span>
      </div>
      <div>
        <span>{secondName}</span>
        <span>{secondAmount}</span>
      </div>
    </div>
  );
}

export default TotalSum;
