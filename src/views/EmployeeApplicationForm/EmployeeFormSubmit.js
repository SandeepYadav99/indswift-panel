import React from "react";
import styles from "./Style.module.css";

function EmployeeFormSubmit() {
  return (
    <div className={styles.FormSubmitWrapper}>
      <div className={styles.formSubmitContainer}>
        <div className={styles.formSubmitImageWrapper}>
          <img
            src={require("../../assets/img/ic_successfully submited.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.formSubmitBottomWrapper}>
          <div className={styles.submitHeader}>
            <p>Application Submit Successfully!</p>
          </div>
          <div className={styles.submitDescription}> 
            <p>We are pleased to inform you that your application form is shared with the HR and our interview panel</p>
          </div>
          <div>
            <p>We will connect with you for the further process at earliest </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeFormSubmit;
