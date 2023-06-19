import React from "react";
import styles from "./Style.module.css";

function UpperDetail({ data }) {
  return (
    <div className={styles.innerwrap}>
      <div className={styles.blueBackground}>
        <div className={styles.innerContainer}>
          <div>
            <img src={data?.candidate?.image} height={70} />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.name}>{data?.candidate?.name}</div>
            <div>{data?.candidate?.designation?.name}</div>
            <div>{data?.candidate?.email}</div>
            <div>{data?.candidate?.contact}</div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.rightInfo}>
            <div>
              <span className={styles.location}>DOB:</span>
              <span className={styles.location21}>{data?.eaf?.dob}</span>
            </div>
            <div>
              <span className={styles.location}>Gender:</span>
              <span className={styles.location21}>{data?.eaf?.gender}</span>
            </div>
            <div>
              <span className={styles.location}>Blood Group:</span>
              <span className={styles.location21}>{data?.eaf?.blood_group}</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperDetail;
