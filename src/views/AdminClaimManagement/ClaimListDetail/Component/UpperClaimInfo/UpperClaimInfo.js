import React from "react";
import styles from "./Style.module.css";
import image from "../../../../../assets/img/download.png";

function UpperClaimInfo({ data,isLoc }) {
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
             { isLoc && <div className={styles.key}>
                <span className={styles.value}>Date of Joining:</span>
                {data?.employee?.doj}
              </div>}
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value21}>Designation:</span>
              {data?.employee?.designation?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value21}>Grade/Cadre:</span>
              {data?.employee?.grade?.code &&
                `${data?.employee?.grade?.code} / ${data?.employee?.cadre?.code}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value21}>Department:</span>
              {data?.employee?.department?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperClaimInfo;
