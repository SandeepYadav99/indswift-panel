import React from "react";
import styles from "./Style.module.css";

const UpperProfileCard = ({ data, handleToggle, handleStatusToggle }) => {
  return (
    <div>
      <div className={styles.blueBackground}>
      <div className={styles.candidateInfo}>Candidate Info</div>
        <div className={styles.innerContainer}>
          <div className={styles.profileInfo}>
            <div className={styles.name}>{data?.name}</div>
            <div>{data?.email}</div>
            <div>{data?.contact}</div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.rightInfo}>
            <div>
              <span className={styles.location}>Designation:</span>{" "}
              {data?.job_opening?.designation?.name}
            </div>
            <div>
              <span className={styles.location}>Department:</span>
              {data?.job_opening?.department?.name}
            </div>
            <div>
              <span className={styles.location}>Grade:</span>{" "}
              {data?.job_opening?.grade?.code}
            </div>
            <div>
              <span className={styles.location}>PRC:</span>
               {data?.job_opening?.code}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpperProfileCard;
