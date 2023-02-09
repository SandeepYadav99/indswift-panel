import React from "react";
import styles from "./Style.module.css";

function SaleryInfoField({ className, component, annual, monthly }) {
  // const getMonthlyValues = (values) => {
  //   if (values === 0) {
  //     return 0;
  //   } else if (values > 0) {
  //     return (values / 12).toFixed(2).replace(/[.,](00)|0$/, "");
  //   } else {
  //     return "-";
  //   }
  // };
  const getAnnualValues = (values) => {
    if (typeof values === "number") {
      return values * 12;
    } else return 0;
  };
  return (
    <div className={className ? className : styles.grossSalaryWrapper}>
      <div className={styles.tableComponentField}>{component}</div>
      <div className={styles.tableAnnualField}>{getAnnualValues(monthly)}</div>
      <div className={styles.tableMonthlyField}>{monthly}</div>
    </div>
  );
}

export default SaleryInfoField;
