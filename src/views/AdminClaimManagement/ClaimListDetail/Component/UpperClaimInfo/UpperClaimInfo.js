import React from "react";
import styles from "./Style.module.css";
import image from "../../../../../assets/img/download.png";

function UpperClaimInfo({data}) {
  console.log('data===',data)
    // const data={}
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
                {data?.employee?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Employee ID:</span>
                {data?.employee?.emp_code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data?.employee?.location?.name}
              </div>
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Designation:</span>
              {data?.employee?.designation?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Grade/Level:</span>
              {data?.employee?.grade?.code}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Department:</span>
              {data?.employee?.department?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperClaimInfo;
