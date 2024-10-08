import React from "react";
import styles from "./Style.module.css";
function CandidateDetails({ data }) {
  console.log(data);
  const Quallength = data?.candidate?.qualifications?.length - 1;
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
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
              <span className={styles.valueWrap}>
                {data?.reporting_location?.name}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Designation:</span>
              <span className={styles.valueWrap}>
                {data?.designation?.name}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Department:</span>
              <span className={styles.valueWrap}>
                {data?.job_data?.department?.name}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Grade:</span>
              <span className={styles.valueWrap}>{data?.grade?.code}</span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Qualification:</span>
              {data?.candidate?.qualifications?.length > 0 && (
                <span className={styles.valueWrap}>
                  {data?.candidate?.qualifications?.map((val, index) =>
                    Quallength !== index ? ` ${val?.degree} , ` : val?.degree
                  )}
                </span>
              )}
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.right}>
            {data?.is_experience_hide !== true && (
              <div className={styles.key}>
                <span className={styles.value}>Experience:</span>
                {data?.candidate?.experience !== undefined && (
                  <span className={styles.valueWrap}>
                    {data?.candidate?.experience > 1
                      ? `${data?.candidate?.experience} years`
                      : `${data?.candidate?.experience} year`}
                  </span>
                )}
              </div>
            )}
            <div className={styles.key}>
              <span className={styles.value}>Source of Hiring:</span>
              <span className={styles.valueWrap}>
                {data?.candidate?.source}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Type of Vacancy:</span>
              <span className={styles.valueWrap}>
                {removeUnderScore(data?.job_data?.vacancy_type)}
              </span>
            </div>
            {/* <div className={styles.key}>
                <span className={styles.value}>OLC Issued:</span>
                <span className={styles.valueWrap}>
                  {data?.code}
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
