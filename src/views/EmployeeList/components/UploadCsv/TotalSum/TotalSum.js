import React from "react";
import styles from "./Style.module.css";

function TotalSum({
  firstName,
  firstAmount,
  secondName,
  secondAmount,
  customClass,
}) {
  return (
    <div className={styles.TotalSumWrapper}>
      <div className={styles.topWrapper}>
        <span className={styles.nameFonts}>{firstName}</span>
        <span
          className={customClass ? customClass : styles.amountFonts}
        >{` ₹ ${firstAmount}`}</span>
      </div>
      {secondAmount && (
        <div>
          <span className={styles.nameFonts}>{secondName}</span>
          <span
            className={customClass ? customClass : styles.amountFonts}
          >{`₹ ${secondAmount}`}</span>
        </div>
      )}
    </div>
  );
}

export default TotalSum;
