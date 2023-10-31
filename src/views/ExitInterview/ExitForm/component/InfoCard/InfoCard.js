import React from "react";
import styles from "./Style.module.css";
import face from "./../../../../../assets/img/download.png";

const InfoCard = ({ data }) => {
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  return (
    <div className={styles.candidateInfoWrapper}>
      <div className={styles.leftField}>
        <div className={styles.headingWrapper}>
          <span>Candidate Information</span>
        </div>
        <div className={styles.imageDesWrapper}>
          <div>
            <img className={styles.candidateImg} src={face} />
          </div>
          <div className={styles.desWrapper}>
            <div className={styles.key}>
              <span className={styles.value}>Name:</span>
              gdfgd
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Designation on Joining:</span>
              gdfgd
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Salary on Joining:</span>
              gdfgd
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Reporting To:</span>
              gdfgd
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Experience with US:</span>
              gdfgd
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightField}>
        <div className={styles.headingWrapper} style={{ visibility: "hidden" }}>
          <span>Interviewer Information</span>
        </div>
        <div className={styles.desWrapper}>
          <div className={styles.key}>
            <span className={styles.value}>Department:</span>
            gdfgd
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Present Designation:</span>
            gdfgd
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Current Salary:</span>
            gdfgd
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Experience Before Joining:</span>
            gdfgd
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Total Experience:</span>
            gdfgd
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
