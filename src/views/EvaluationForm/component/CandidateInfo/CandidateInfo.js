import React from "react";
import styles from "./Style.module.css";
import face from "./../../../../assets/img/download.png";

function CandidateInfo() {
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
            <span>
              <strong>Aman Sharma</strong>
            </span>
            <span>Support Engineer</span>
            <a href="#">Candidate Resume Link</a>
          </div>
        </div>
      </div>
      <div className={styles.rightField}>
        <div className={styles.headingWrapper}>
          <span>Interviewer Information</span>
        </div>
        <div className={styles.desWrapper}>
            <span>
              <strong>Srikant Tripathi</strong>
              <strong> . 24/12/2022</strong>
            </span>
            <span>Mumbai Office</span>
            <span>F2F Interview</span>
          </div>
        
      </div>
    </div>
  );
}

export default CandidateInfo;
