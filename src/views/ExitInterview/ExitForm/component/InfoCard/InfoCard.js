import React from "react";
import styles from "./Style.module.css";
import face from "./../../../../../assets/img/download.png";

const InfoCard = ({ data }) => {

  console.log("data", data);
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
              {data?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Reporting To:</span>
              {data?.hod?.hod_name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Experience with US:</span>
              {data?.experience?.current}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Experience Before Joining:</span>
              {data?.experience?.before}
            </div>{" "}
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
            {data?.department?.name}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Present Designation:</span>
            {data?.designation?.name}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Current Salary:</span>
            -
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Total Experience:</span>
            {data?.experience?.total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
