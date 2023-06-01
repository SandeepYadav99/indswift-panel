import React from "react";
import styles from "./Style.module.css";
import StatusPill from "../../../../components/Status/StatusPill.component";

function InterviewBankInfo({ idCards }) {
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.heading}>Bank Details</div>
        </div>
        <div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Account Number:</span>
                {removeUnderScore(idCards?.account_no)}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>IFSC Code:</span>
                {idCards?.ifsc}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Branch Name:</span>
                {idCards?.branch_name}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Beneficiary Name:</span>
                {idCards?.beneficiary_name}
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Bank Name:</span>
                {idCards?.bank_name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewBankInfo;
