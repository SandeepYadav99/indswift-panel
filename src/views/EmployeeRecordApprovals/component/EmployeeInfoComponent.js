import React from "react";
import styles from "./Style.module.css";

const EmployeeInfoComponent = ({ empInfoList }) => {
    
  return (
    <div className={styles.flex}>
      <img src={empInfoList?.image} className={styles.image} alt="" />
      <div>
        <div className={styles.infoLabel}>
          {" "}
          <b>{empInfoList?.name}</b>{" "}
        </div>
        <div className={styles.infoLabel}>{empInfoList?.emp_code}</div>
        <div className={styles.infoLabel}>
          {empInfoList?.location?.name}, {empInfoList?.department?.name}, {empInfoList?.sub_department?.name}
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoComponent;
