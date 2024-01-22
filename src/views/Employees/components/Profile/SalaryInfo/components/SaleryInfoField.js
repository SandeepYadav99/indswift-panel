import React from "react";
import styles from "./Style.module.css";

function SaleryInfoField({ className, component, annual, monthly }) {
  const getAnnualValues = (values) => {
    if (typeof values === "number") {
      return values * 12;
    } else return 0;
  };
  return (
    <div className={className ? className : styles.grossSalaryWrapper}>
      <div className={styles.tableComponentField} >{component}</div>
      <div className={styles.salaryWrapper}>
      <div className={styles.tableAnnualField}>{getAnnualValues(monthly)}</div>
      <div className={styles.tableMonthlyField}>
        {monthly === (null || undefined) ? 0 : monthly}
      </div>
      </div>
      
    </div>
  );
}

export default SaleryInfoField;
