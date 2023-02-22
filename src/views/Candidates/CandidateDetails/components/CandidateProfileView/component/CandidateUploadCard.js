import React from "react";
import styles from "./Style.module.css";

const CandidateUploadCard = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Candidate Uploads</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <a
                  className={styles.uploadTag}
                  target="_blank"
                  href={data?.resume}
                >
                  Resume
                </a>
              </div>
              <div className={styles.key}>
                <a className={styles.uploadTag} target="_blank" href="#">
                  EAF Form
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateUploadCard;
