import React, { useMemo } from "react";
import { Link } from "react-router-dom";
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
                <Link
                  to={`/job/openings/details/${data?.job_opening?.id}`}
                  target="_blank"
                  style={{color: "#2896e9" }}
                >
                  <span className={styles.valueWrap}>
                    {data?.job_opening?.code}
                  </span>
                </Link>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Type of Vacancy:</span>
                <span className={styles.valueWrap}>
                  {data?.job_opening?.vacancy_type}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Place of Posting:</span>
                <span className={styles.valueWrap}>
                  {data?.job_opening?.location?.name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Candidate Grade:</span>
                 <span className={styles.valueWrap}>{data?.job_opening?.grade?.code}</span>
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
                  {data?.job_opening?.assigned_person?.name
                    ? data?.job_opening?.assigned_person?.name
                    : ""}
                </span>
              </div>
              {data?.offer_letter?.designation?.name && (<div className={styles.key}>
                <span className={styles.value}>Offered Designation:</span>
                <span className={styles.valueWrap}>
                  {data?.offer_letter?.designation?.name
                      ? data?.offer_letter?.designation?.name
                      : ""}
                </span>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateAssociateJob;
