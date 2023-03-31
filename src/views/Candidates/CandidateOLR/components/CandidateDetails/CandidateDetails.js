import React from 'react'
import styles from './Style.module.css'
function CandidateDetails({ data }) {
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainerPersonal}>
        <div className={styles.heading}>
          Candidate Details - {data?.candidate?.name}
        </div>

          <div className={styles.mainFlex2}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Place of Posting:</span>
                <span className={styles.valueWrap}>{data?.reporting_location?.name}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                <span className={styles.valueWrap}>{data?.job_data?.designation?.name}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                <span className={styles.valueWrap}>{data?.job_data?.department?.name}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Grade:</span>
                <span className={styles.valueWrap}>
                  {data?.job_data?.grade?.name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Qualification:</span>
                <span className={styles.valueWrap}>
                  {/*{(data?.candidate?.qualifications?.map((val) => val.degree))?.join(', ')}*/}
                </span>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Experience:</span>
                <span className={styles.valueWrap}>
                  {data?.candidate?.experience > 1
                    ? `${data?.candidate?.experience} years`
                    : `${data?.candidate?.experience} year`}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Source of Hiring:</span>
                <span className={styles.valueWrap}>{data?.candidate?.source}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Type of Vacancy:</span>
                <span className={styles.valueWrap}>
                  {data?.job_data?.vacancy_type}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>OLC Issued:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.spouse_dob}
                </span>
              </div> */}
            <div className={styles.key}>
              <span className={styles.value}>Candidate Relocating From:</span>
              <span className={styles.valueWrap}>
                {data?.candidate?.city}{" "}
                {data?.candidate?.state && `, ${data?.candidate?.state}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
