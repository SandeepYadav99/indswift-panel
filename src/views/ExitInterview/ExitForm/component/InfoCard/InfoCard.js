import React from "react";
import styles from "./Style.module.css";
import face from "./../../../../../assets/img/download.png";

const InfoCard = ({ data, salary }) => {
  return (
    <div className={styles.candidateInfoWrapper}>
      <div className={styles.containerTop}>
        <div className={styles.headingWrapper}>
          <span>Candidate Information</span>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.imageAlignCenter}>
            <img className={styles.candidateImg} src={face} />
          </div>
          <div className={styles.thirdContainer}>
            <div className={styles.leftField}>
              <div className={styles.imageDesWrapper}>
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
                    <span className={styles.value}>
                      Experience Before Joining:
                    </span>
                    {data?.experience?.before}
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className={styles.rightField}>
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
                  {salary ? `₹ ${salary}` : "-"}
                </div>{" "}
                <div className={styles.key}>
                  <span className={styles.value}>Total Experience:</span>
                  {data?.experience?.total}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
