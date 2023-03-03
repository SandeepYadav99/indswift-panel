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
            <div>Smriti Sharma</div>
            <div>smritisharma@gmail.com</div>
            <a target="_blank" href={data?.resume}>
              {" "}
              <span>View Resume</span>
            </a>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.rightInfo}>
            <div>
              <span className={styles.location}>Designation:</span>{" "}
              {data?.referred_obj?.name}
            </div>
            <div>
              <span className={styles.location}>Department:</span>
              {data?.appliedDateText}
            </div>
            <div>
              <span className={styles.location}>Grade:</span>{" "}
              {/* {splitDate(data?.updatedAtText)} */}
            </div>
            <div>
              <span className={styles.location}>PRC:</span>
              {/* {data?.appliedDateText} */}
            </div>
          </div>
           
        </div>
      </div>
    </div>
  );
};

export default UpperProfileCard;
