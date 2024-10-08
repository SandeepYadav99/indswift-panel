import React, { useCallback } from "react";
import styles from "./Style.module.css";

const CandidatePersonalInfo = ({ data }) => {
  const renderExperience = useCallback((exp) => {
    if (exp == "0") {
      return exp;
    } else if (exp == "1") {
      return `${exp} year`;
    } else if (exp > "1") {
      return `${exp} years`;
    } else {
      return "-";
    }
  }, []);
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainerPersonal}>
          <div className={styles.heading}>Personal Information</div>
          <div className={styles.mainFlex2}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Father's Name:</span>
                <span className={styles.valueWrap}>
                  {data?.father_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Current City:</span>
                <span className={styles.valueWrap}>{data?.city}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Domicile State:</span>
                <span className={styles.valueWrap}>{data?.state}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Aadhar Number:</span>
                <span className={styles.valueWrap}>{data?.aadhar}</span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Source:</span>
                <span className={styles.valueWrap}>
                  {data?.source}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Candidate Experience:</span>
                <span className={styles.valueWrap}>
                  {renderExperience(data?.experience)}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Previous Annual CTC:</span>
                <span className={styles.valueWrap}>
                  {data?.previous_ctc ? `${data?.previous_ctc}`: ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePersonalInfo;
