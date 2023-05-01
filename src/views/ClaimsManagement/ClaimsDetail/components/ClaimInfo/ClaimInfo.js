import React from "react";
import styles from "./Style.module.css";

function ClaimInfo({ idCards, isLocal, isMarriage }) {
  return (
    <div className={styles.newContainer}>
      <div className={styles.heading}>Claim Details</div>
      <div className={styles.mainFlex}>
        <div className={styles.left}>
          {!isLocal && !isMarriage && (
            <div className={styles.key}>
              <span className={styles.value}>Entitled Amount:</span>
              {idCards?.entitled_amount && `₹ ${idCards?.entitled_amount}`}
            </div>
          )}
          <div className={styles.key}>
            <span className={styles.value}>Amount Claimed:</span>
            {idCards?.total_claim && `₹ ${idCards?.total_claim}`}
          </div>
          {isLocal && (
            <>
              <div className={styles.key}>
                <span className={styles.value}>Bike Rate:</span>
                {idCards?.bike_rate && `₹ ${idCards?.bike_rate}/km`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Public Transport Rate:</span>
                {idCards?.pt_rate && `₹ ${idCards?.pt_rate}/km`}
              </div>
            </>
          )}
        </div>
        <div className={styles.right}>
          <div className={styles.key}>
            <span className={styles.value}>Claim in Process:</span>
            {idCards?.progress_claim && `₹ ${idCards?.progress_claim}`}
          </div>
          {!isLocal && !isMarriage && (
            <div className={styles.key}>
              <span className={styles.value}>Pending Claim:</span>
              {idCards?.pending_claim && `₹ ${idCards?.pending_claim}`}
            </div>
          )}
          {isLocal && (
            <div className={styles.key}>
              <span className={styles.value}>Car Rate:</span>
              {idCards?.car_rate && `₹ ${idCards?.car_rate}/km`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClaimInfo;
