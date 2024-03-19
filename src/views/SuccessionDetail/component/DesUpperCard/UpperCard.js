import React from "react";
import styles from "./Style.module.css";
function DesUpperCard({ employeeDetail }) {
  console.log("employeeDetail", employeeDetail);
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Employee Information</div>
        </div>

        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Name:</span>
              {employeeDetail?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Employee ID:</span>
              {employeeDetail?.emp_code}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Location:</span>
              {employeeDetail?.location?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>D.O.B:</span>
              {employeeDetail?.dob}{" "}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Age:</span>
              {employeeDetail?.age}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Annual Salary:</span>
              {employeeDetail?.application?.ctc
                ? `₹ ${employeeDetail?.application?.ctc}`
                : "-"}
            </div>
          </div>

          <div className={styles.vertical}></div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>Designation:</span>
              {employeeDetail?.designation?.name
                ? employeeDetail?.designation?.name
                : "NA"}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Grade/Level:</span>
              {employeeDetail?.grade?.code}/{employeeDetail?.cadre?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Department:</span>
              {employeeDetail?.department?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Date of Retirement:</span>
              {employeeDetail?.expected_dor_text
                ? `${employeeDetail?.expected_dor_text}`
                : "NA"}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>D.O.J:</span>
              {employeeDetail?.doj ? `${employeeDetail?.doj}` : "NA"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesUpperCard;
