import React, { useCallback } from "react";
import styles from "./Style.module.css";

const CandidateEmployment = ({ history }) => {
  let dataLength = history?.length - 1;
  const renderExperience = useCallback((exp) => {
    if (exp == "0") {
      return exp;
    } else if (exp == "1") {
      return `${exp} yr`;
    } else if (exp > "1") {
      return `${exp} yrs`;
    } else {
      return "-";
    }
  }, []);
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Employment Information</div>
          {history?.map((item, index) => {
            return (
              <div className={styles.mainFlex3} key={`historydetail${index}`}>
                <div className={styles.left1}>
                  <div className={styles.key4}>
                    <span className={styles.value}>Organisation:</span>
                    <span className={styles.valueWrap}>
                      {item?.organisation_name}
                    </span>
                  </div>
                  <div className={styles.key4}>
                    <span className={styles.value}>Designation:</span>
                    <span className={styles.valueWrap}>
                      {item?.designation}
                    </span>
                  </div>
                  <div className={styles.key4}>
                    <span className={styles.value}>
                      Work Duration In Years:
                    </span>
                    <span className={styles.valueWrap}>{renderExperience(item?.duration)}</span>
                  </div>
                </div>
                {index === dataLength ? (
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

export default CandidateEmployment;
