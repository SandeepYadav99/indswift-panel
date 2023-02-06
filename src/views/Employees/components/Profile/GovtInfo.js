import React from "react";
import styles from "./Style.module.css";

const GovtInfo = ({ idCards }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Govt ID Data</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Aadhar Number:</span>
                {idCards?.aadhar_no}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>PAN Number:</span>
                {idCards?.pan_no}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>ESI Number:</span>
                {idCards?.esi_no}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>UAN Number:</span>
                {idCards?.uan_no}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovtInfo;
