import React from "react";
import styles from "./Style.module.css";
import StatusPill from "../../../../../components/Status/StatusPill.component";

function ClaimDetailInfo({ idCards }) {
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  console.log("idCards", idCards);
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
                <span className={styles.value}>Imprest Required for:</span>
                {removeUnderScore(idCards?.imprest?.imprestTypeText)}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Tour Dates:</span>
                {idCards?.imprest?.rem_month}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Tour Type:</span>
                {idCards?.imprest?.tour_type}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Balance Outstanding:</span>
                {idCards?.imprest?.claim_details?.progress_claim &&
                  `₹ ${idCards?.imprest?.claim_details?.progress_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Sanctionable Amount:</span>
                {idCards?.imprest?.claim_details?.progress_claim &&
                  `₹ ${idCards?.imprest?.claim_details?.progress_claim}`}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Assoicated TAP:</span>
                {idCards?.imprest?.travelPlanner?.code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Status:</span>
                {<StatusPill status={idCards?.imprest?.status}/>}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Max Entitled:</span>
                {idCards?.imprest?.bill_amount && `₹ ${idCards?.imprest?.bill_amount}`}
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Required Amount:</span>
                {idCards?.imprest?.amount && `₹  ${idCards?.imprest?.amount}`}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimDetailInfo;
