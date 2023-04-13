import React from "react";
import styles from "./Style.module.css";

function ClaimDetailInfo({ idCards }) {
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.heading}>Claim Details</div>

        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Bill Date:</span>
              {idCards?.billDateText}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Bill Amount:</span>
              {idCards?.bill_amount}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Amount to be Reimbursed:</span>
              {idCards?.pan_no}
            </div>
            <div className={styles.key}>
              <a href={idCards?.document} target="_blank">
                <div className={styles.hyperlinkText}>View Attachment</div>
              </a>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>Entitled Amount:</span>
              {idCards?.claim_details?.entitled_amount}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Claim in Process:</span>
              {idCards?.claim_details?.progress_claim}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Pending Claim:</span>
              {idCards?.claim_details?.pending_claim}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimDetailInfo;
