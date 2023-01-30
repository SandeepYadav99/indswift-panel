import React from "react";
import styles from "./Style.module.css";

function RecentUpdate() {
  return (
    <div className={styles.RecentUpdateContainer}>
      <div>
        <span className={styles.title}>Recent Circular & Policies</span>
        <div className={styles.newLine} />
      </div>
      <div className={styles.descriptionContainer}>
        <div>
          <img src={require("../../../../assets/img/policy.png")} />
        </div>
        <div className={styles.description}>
          <span className={styles.descriptionName}>
            Development and Placement of Contractual Manpower on Dexterous Jobs
          </span>
          <span className={styles.effectiveDate}>
            Effective Date: 27/11/2021
          </span>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div>
          <img src={require("../../../../assets/img/circular.png")} />
        </div>
        <div className={styles.description}>
          <span className={styles.descriptionName}>
            Relocation Expenditure Policy
          </span>
          <span className={styles.effectiveDate}>
            Effective Date: 27/11/2021
          </span>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div>
          <img src={require("../../../../assets/img/policy.png")} />
        </div>
        <div className={styles.description}>
          <span className={styles.descriptionName}>Marriage Gift Policy</span>
          <span className={styles.effectiveDate}>
            Effective Date: 27/11/2021
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecentUpdate;
