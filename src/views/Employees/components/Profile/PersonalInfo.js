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
                <span className={styles.valueWrap}>{data?.dob}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Domicile State:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.father_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Father's Name:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.father_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Mother's Name:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.mother_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Marital Status:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.martial_status}
                </span>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>DOM:</span>
                <span className={styles.valueWrap}>{data?.dom}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Spouse Name:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.spouse_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Children Name:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.children_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Gender:</span>
                <span className={styles.valueWrap}>{data?.gender}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Blood Group:</span>
                <span className={styles.valueWrap}>{data?.blood_group}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
