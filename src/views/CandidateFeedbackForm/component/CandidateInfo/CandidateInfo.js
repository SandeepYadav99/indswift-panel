import React from "react";
import styles from "./Style.module.css";
import face from "./../../../../assets/img/download.png";

const CandidateInfo = ({ data }) => {
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
              <strong>{data?.candidate?.name}</strong>
            </span>
            <span>Support Engineer</span>
            <a href={data?.candidate?.resume} target={'_blank'}>Candidate Resume Link</a>
          </div>
        </div>
      </div>
      <div className={styles.rightField}>
        <div className={styles.headingWrapper}>
          <span>Interviewer Information</span>
        </div>
        <div className={styles.desWrapper}>
            <span>
              <strong>{data?.interviewer?.name}</strong>
              <strong> . {data?.interviewDateText}</strong>
            </span>
            <span>{data?.venue}</span>
            <span>{data?.mode} Interview</span>
          </div>

      </div>
    </div>
  );
}

export default CandidateInfo;
