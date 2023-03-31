import React from "react";
import styles from "./Style.module.css";

function ReplacementDetails({data}) {
  const textValue = (key) => {
    if (key) {
      return key;
    } return '-';
  }
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainerPersonal}>
        <div className={styles.heading}>Replacement (RAP/RAB) Details</div>

          <div className={styles.mainFlex2}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Vaccant Tenure (Days):</span>
                <span className={styles.valueWrap}>-</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Name:</span>
                <span className={styles.valueWrap}>{textValue(data?.replacing_person?.name)}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Designation:</span>
                <span className={styles.valueWrap}>{textValue(data?.replacing_person?.designation)}</span>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Grade:</span>
                <span className={styles.valueWrap}>
                 {textValue(data?.replacing_person?.grade)}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Experience:</span>
                <span className={styles.valueWrap}>
                  {textValue(data?.replacing_person?.experience) !== '-' ? (data?.replacing_person?.experience > 1
                      ? `${data?.replacing_person?.experience} years`
                      : `${data?.replacing_person?.experience} year`) : '-'}
                </span>

            </div>
            <div className={styles.key}>
              <span className={styles.value}>Replacing CTC (LPA):</span>
              {data?.replacing_person?.ctc && (
                <span className={styles.valueWrap}>
                     {data?.replacing_person?.ctc ? `Rs. ${data?.replacing_person?.ctc} /-` : '-'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplacementDetails;
