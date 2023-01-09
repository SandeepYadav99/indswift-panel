import React from "react";
import styles from "./Style.module.css";

const PersonalInfo = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Personal Information</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>DOB:</span>
                {data?.dob}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Domicile State:</span>
                {data?.family?.father_name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Father's Name:</span>
                {data?.family?.father_name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Mother's Name:</span>
                {data?.family?.mother_name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Marital Status:</span>
                {data?.family?.martial_status}
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>DOM:</span>
                {data?.dom}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Spouse Name:</span>
                {data?.family?.spouse_name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Children Name:</span>
                {data?.family?.children_name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Gender:</span>{data?.gender}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Blood Group:</span>{data?.blood_group}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
