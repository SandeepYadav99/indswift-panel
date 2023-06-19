import React, { useMemo } from "react";
import styles from "./Style.module.css";

const PersonalInfo = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainerPersonal}>
          <div className={styles.heading}>Personal Information</div>

          <div className={styles.mainFlex2}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Place of Birth:</span>
                <span className={styles.valueWrap}>{data?.birthplace ? data?.birthplace : '-'}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>DOM:</span>
                <span className={styles.valueWrap}>{data?.dom ? data?.dom : '-'}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Religion:</span>
                <span className={styles.valueWrap}>{data?.religion ? data?.religion : '-'}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>UID/Aadhar No:</span>
                <span className={styles.valueWrap}>
                  {data?.aadhar_no ? data?.aadhar_no : '-'}
                </span>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>PAN No:</span>
                <span className={styles.valueWrap}>
                  {data?.pan_no ? data?.pan_no : '-'}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Passport No:</span>
                <span className={styles.valueWrap}>{data?.passport_no ? data?.passport_no : '-'}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Expiry Date of Passport:</span>
                <span className={styles.valueWrap}>
                  {data?.passport_expiry_date ? data?.passport_expiry_date : '-'}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>PF UAN No:</span>
                <span className={styles.valueWrap}>
                  {data?.uan_no ? data?.uan_no : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
