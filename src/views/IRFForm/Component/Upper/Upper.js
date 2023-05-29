import React from "react";
import styles from "./Style.module.css";
import img from "../../../../assets/img/ic_employee image@2x.png"

function Upper({ data }) {
  return (
    <div className={styles.ProfileUpperWrapper}>
      <div className={styles.profileName}>
        <h2>Personal Information</h2>
        <p>
          <b>{data?.name}</b>
        </p>
        <p>
          <b>{data?.email}</b>
        </p>
        <p>
          <b>{data?.contact}</b>
        </p>
      </div>
      <div className={styles.profileimg}>
        <div>
          <img
            className={styles.applicationImage}
            src={data?.image}
          />
        </div>
      </div>
    </div>
  );
}

export default Upper;
