import React from "react";
import styles from "./Style.module.css";
import image from "../../../../assets/img/download.png";

function UpperIntroInfo({data}) {
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Employee Information</div>
        </div>

        <div className={styles.mainFlex}>
          <div className={styles.left221}>
            <div>
              <img
                className={styles.claimimg}
                src={data?.image ? data?.image : image}
              />
            </div>
            <div>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {data?.candidate?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Position Applied For:</span>
                {data?.candidate?.emp_code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data?.job?.location?.name}
              </div>
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>PRC:</span>
              {/* {data?.job?.designation?.name} */}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Grade:</span>
              {data?.job?.grade?.code }
              
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Recruiter:</span>
              {data?.job?.department?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperIntroInfo;
