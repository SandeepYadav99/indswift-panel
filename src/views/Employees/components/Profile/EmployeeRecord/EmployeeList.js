import React from "react";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import styles from "./Style.module.css";

function EmployeeList({ className,title, component, annual, monthly }) {
  const getAnnualValues = (values) => {
    if (typeof values === "number") {
      return values * 12;
    } else return 0;
  };
  return (
    <div className={className ? className : styles.grossSalaryWrapper}>
      <div className={styles.tableComponentField}>
        <div className={styles.title}>{title}</div>
        <div className={styles.historyDes}>{component}</div>
      </div>
      <div className={styles.tableAnnualField}>
        <StatusPill status="Positive" />
      </div>
      <div className={styles.tableMonthlyField}>
        {monthly === (null || undefined) ? 0 : monthly}
      </div>
    </div>
  );
}

export default EmployeeList;
