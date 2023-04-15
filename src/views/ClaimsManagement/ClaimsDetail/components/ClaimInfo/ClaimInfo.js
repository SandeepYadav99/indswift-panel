import React from "react";
import styles from "./Style.module.css";

function ClaimInfo({ idCards }) {
  return (
    <div className={styles.newContainer}>
      <div className={styles.heading}>Claim Details</div>

      <div className={styles.mainFlex}>
        <div className={styles.left}>
          <div className={styles.key}>
            <span className={styles.value}>Entitled Amount:</span>
            {idCards?.entitled_amount && `₹ ${idCards?.entitled_amount}`}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>Amount Claimed:</span>
            {idCards?.total_claim && `₹ ${idCards?.total_claim}`}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.key}>
            <span className={styles.value}>Claim in Process:</span>
            {idCards?.progress_claim && `₹ ${idCards?.progress_claim}`}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>Pending Claim:</span>
            {idCards?.pending_claim && `₹ ${idCards?.pending_claim}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimInfo;
