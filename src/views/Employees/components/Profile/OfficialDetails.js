import React from "react";
import styles from "./Style.module.css";

const OfficialDetails = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Official Details</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>DOJ:</span>
                <span className={styles.valueWrap}>{data?.doj}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Experience With Org:</span>
                <span className={styles.valueWrap}>1</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Previous Org:</span>
                <span className={styles.valueWrap}>Oracle</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Past Experience:</span>
                <span className={styles.valueWrap}>2</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Total Experience:</span>
                <span className={styles.valueWrap}>5</span>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Grade:</span>
                <span className={styles.valueWrap}>A</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Cadre:</span>
                <span className={styles.valueWrap}>-</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Level:</span>
                <span className={styles.valueWrap}>A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialDetails;
