import React from "react";
import styles from "./Style.module.css";
import face from "../../../../assets/img/download.png";

const InfoCardUpper = ({ data }) => {
  console.log("data",data)
  return (
    <div className={styles.candidateInfoWrapper}>
      <div className={styles.leftField}>
        <div className={styles.headingWrapper}>
          <span>Employee Information</span>
        </div>
        <div className={styles.imageDesWrapper}>
          <div>
            <img className={styles.candidateImg} src={data?.image} alt="image"/>
          </div>
          <div className={styles.desWrapper}>
            <div className={styles.key}>
              <span className={styles.value}>Name:</span>
              {data?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Employee ID:</span>
              {data?.emp_code}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Location:</span>
              {data?.location?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>D.O.B:</span>
              {data?.dob}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Age:</span>
              {data?.age}
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
            <span className={styles.value}>Grade/Level:</span>
            {data?.grade?.code}/{data?.cadre?.code}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Designation:</span>
            {data?.designation?.name}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Date of Retirement:</span>
            {data?.expected_dor_text}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>D.O.J:</span>
            {data?.doj}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCardUpper;
