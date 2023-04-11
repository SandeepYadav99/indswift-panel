import React from "react";
import styles from "../../Style.module.css";

function ClaimUpper() {
  return (
    <div className={styles.claimUpperWrapper}>
      <div>
        <strong>Cadre Details</strong>
      </div>
      <div className={styles.UpperGrade}>
        <div className={styles.upperGradeInfo}>
          <div className={styles.uppertitle}>Grade</div>
          <div className={styles.upperdes}>Grade</div>
        </div>
        <div className={styles.upperGradeInfo}>
          <div className={styles.uppertitle}>Grade</div>
          <div className={styles.upperdes}>Grade</div>
        </div> 
      </div>
    </div>
  );
}

export default ClaimUpper;
