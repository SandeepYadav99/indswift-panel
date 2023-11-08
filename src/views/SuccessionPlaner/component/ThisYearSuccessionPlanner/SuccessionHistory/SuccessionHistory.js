import React from "react";
import styles from "./Style.module.css";
const SuccessionHistory = () => {
  return (
    <div>
      <div className={styles.successContainer}>
        <div class={styles.letterInfo}>
          <div>
            <span>Letter Title:</span>
            <span>Increment Letter for 2022</span>
          </div>
          <div>
            <span>Type of Letter:</span>
            <span>Appraisal Letter</span>
          </div>
          <div>
            <span>Date of Issue:</span>
            <span>02/12/2022</span>
          </div>
          <div className={styles.letterHead}>
            <div className={styles.head}>
              <span>Letter Head No. :</span>
              <span>AL/CC/1042022</span>
            </div>
            <div>
              <a href="" className={styles.link}>
                View File
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessionHistory;
