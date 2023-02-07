import React from "react";
import styles from "./Style.module.css";

function SaleryInfoField({ className, component, annual, monthly }) {
  return (
    <div className={className ? className : styles.grossSalaryWrapper}>
      <div className={styles.tableComponentField}>{component}</div>
      <div className={styles.tableAnnualField}>{annual}</div>
      <div className={styles.tableMonthlyField}>{monthly}</div>
    </div>
  );
}

export default SaleryInfoField;
