import React from "react";
import styles from "./Style.module.css";
import image from "../../../../../assets/img/download.png";

function ClaimUpperCard() {
  const data = {};
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Employee Information</div>
        </div>

        <div className={styles.mainFlex}>
          <div className={styles.left221}>
            <div>
              <img className={styles.claimimg} src={image} />
            </div>
            <div>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {/* {data?.name} */}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Employee ID:</span>
                {data?.code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data?.address}
              </div>
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Designation:</span>
              {data?.city}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Grade/Level:</span>
              {data?.state}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Department:</span>
              {data?.pincode}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimUpperCard;
