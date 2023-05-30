import React from "react";
import styles from "./Style.module.css";
import StatusPill from "../../../../components/Status/StatusPill.component";

function InterviewDetailInfo({ idCards }) {
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.heading}>Claim Details</div>
          <div>
            <StatusPill status={removeUnderScore(idCards?.status)} />
          </div>
        </div>
        <div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Claim type :</span>
                {removeUnderScore(idCards?.claim?.claim_type)}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Travel From:</span>
                {idCards?.claim?.travel_details?.from}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Mode of Travel:</span>
                {idCards?.claim?.travel_details?.mode}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Bill Amount:</span>
                {idCards?.claim?.bill_amount}
              </div>
              {idCards?.claim?.payment_proof && (
                <div className={styles.key}>
                  <a href={idCards?.claim?.payment_proof} target="_blank">
                    <div className={styles.hyperlinkText}>
                      View Payment Proof
                    </div>
                  </a>
                </div>
              )}
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Date of Interview:</span>
                {idCards?.interviewDateText}
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Travel To:</span>
                {idCards?.claim?.travel_details?.to}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Class of Travel:</span>
                {removeUnderScore(idCards?.claim?.travel_details?.class)}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Amount to be Reimbursed:</span>
                {idCards?.claim?.claim_amount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailInfo;
