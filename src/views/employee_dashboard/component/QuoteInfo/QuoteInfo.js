import React from "react";
import styles from "./Style.module.css";

function QuoteInfo() {
  return (
    <div className={styles.userInfoWrapper}>
      <div className={styles.UserinfoRight}>
        <div>
          <p className={styles.quoteDate}>Tuesday, 02 Jan, 2023</p>
        </div>
        <div className={styles.UserinfoContactWrapper}>
          <p className={styles.contactUpper}>
            In religion, faith is a virtue. In science, faith is a vice. 
          </p>
          <p className={styles.contactLower}>
            Jerry Coyne, biology professor (b. 30 Dec 1949)
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuoteInfo;
