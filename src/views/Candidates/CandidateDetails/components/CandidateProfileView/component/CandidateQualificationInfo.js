import React from "react";
import styles from "./Style.module.css";

const CandidateQualificationInfo = ({ qualification }) => {
  let dataLength = qualification?.length - 1;
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Qualification Information</div>
          {qualification?.length &&
            qualification?.map((item, index) => {
              return (
                <div
                  className={styles.mainFlex3}
                  key={`qualificationdetail${index}`}
                >
                  <div className={styles.left1}>
                    <div className={styles.key1}>
                      <span className={styles.value}>Degree Name:</span>
                      <span className={styles.valueWrap}>{item?.degree}</span>
                    </div>
                    <div className={styles.key1}>
                      <span className={styles.value}>Degree Marks:</span>
                      <span className={styles.valueWrap}>{item?.marks ? `${item?.marks} %`:''}</span>
                    </div>
                  </div>
                  {  index === dataLength ? (
                    <></>
                  ) : (
                    <div className={styles.horizontal}></div>
                  )}
                  {/* <div className={styles.horizontal}></div> */}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CandidateQualificationInfo;
