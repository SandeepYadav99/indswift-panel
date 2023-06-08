import React from "react";
import styles from "./Style.module.css";
import { removeUnderScore } from "../../../../../helper/helper";
import StatusPill from "../../../../../components/Status/StatusPill.component";
function Upper({ idCards }) {
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.heading}>Travel Planner</div>
          <div>
            <StatusPill status={removeUnderScore(idCards?.status)} />
          </div>
        </div>
        <div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Tour Dates:</span>
                {idCards?.startDateText}- {idCards?.endDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Type of Tour:</span>
                {idCards?.tour_type}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Purpose of your travel:</span>
                {idCards?.purpose}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>No of Days:</span>
                {idCards?.bill_amount && `₹ ${idCards?.bill_amount}`}
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Nature of Tour:</span>
                {idCards?.tour_nature}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upper;
