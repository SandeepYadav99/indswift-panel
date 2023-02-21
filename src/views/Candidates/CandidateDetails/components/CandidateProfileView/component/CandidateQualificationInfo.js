
import React from "react";
import styles from "./Style.module.css";

const CandidateQualificationInfo = ({ contact }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Qualification Information</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Degree Name:</span>
                <span className={styles.valueWrap}>
                  {contact?.official_contact
                    ? contact?.official_contact
                    : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Degree Name:</span>
                <span className={styles.valueWrap}>
                  {contact?.personal_contact
                    ? contact?.personal_contact
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Degree Marks:</span>
                <span className={styles.valueWrap}>
                  {contact?.official_email ? contact?.official_email : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Degree Marks:</span>
                <span className={styles.valueWrap}>
                  {contact?.personal_email ? contact?.personal_email : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateQualificationInfo;
