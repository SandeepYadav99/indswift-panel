import React from "react";
import styles from "../../Style.module.css";

function ClaimBills() {
  const idCards = {};
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Claim Details</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Bill Date:</span>
                {idCards?.aadhar_no}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Bill Amount:</span>
                {idCards?.pan_no}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Amount to be Reimbursed:</span>
                {/* {idCards?.pan_no} */}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>View Attachments</span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Entitled Amount:</span>
                {idCards?.esi_no}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim in Process:</span>
                {idCards?.uan_no}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Pending Claim:</span>
                {idCards?.uan_no}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimBills;
