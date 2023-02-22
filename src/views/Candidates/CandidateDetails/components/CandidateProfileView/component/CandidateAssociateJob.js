import React, { useMemo } from "react";
import styles from "./Style.module.css";

const CandidateAssociateJob = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainerPersonal}>
          <div className={styles.heading}>Associated Job Opening</div>
          <div className={styles.mainFlex2}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>RAP ID:</span>
                <span className={styles.valueWrap}>
                  {data?.job_opening?.code}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Type of Vacancy:</span>
                <span className={styles.valueWrap}>{data?.job_opening?.vacancy_type}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Place of Posting:</span>
                {/* <span className={styles.valueWrap}>{data?.state}</span> */}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Candidate Grade:</span>
                {/* <span className={styles.valueWrap}>{data?.state}</span> */}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Department Applied For:</span>
                <span className={styles.valueWrap}>
                  {data?.job_opening?.department?.name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Designation Applied For:</span>
                <span className={styles.valueWrap}>
                  {data?.job_opening?.designation?.name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Associated HR:</span>
                <span className={styles.valueWrap}>
                  {/* {data?.previous_ctc} */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateAssociateJob;
