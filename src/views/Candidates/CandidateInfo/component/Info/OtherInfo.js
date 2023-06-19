import React from "react";
import styles from "./Style.module.css";

const OtherInfo = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Other Information</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key41}>
                <span className={styles.value41}>
                  Interviewed by ISLL before:
                </span>
                {data?.is_interviewed_before ? data?.is_interviewed_before : '-'}
              </div>
              <div className={styles.key41}>
                <span className={styles.value41}>Interview Date:</span>
                {data?.interview_date ? data?.interview_date : '-'}
              </div>
              <div className={styles.key41}>
                <span className={styles.value41}>
                  Position Interviewed for:
                </span>
                {data?.interviewed_for ? data?.interviewed_for : '-'}
              </div>
              <div className={styles.key41}>
                <span className={styles.value41}>
                  Any additional information:
                </span>
                {data?.note ? data?.note : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherInfo;
