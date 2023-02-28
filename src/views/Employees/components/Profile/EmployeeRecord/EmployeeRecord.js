import React from "react";
import noCPCimage from "./../../../../../assets/img/ic_no cpc info.png";
import styles from "./Style.module.css";
import EmployeeRecordTable from "./EmployeeRecordTable";
function EmployeeRecord() {
  return (
    <div className={styles.wraper}>
      <EmployeeRecordTable />
    </div>
  );
}

export default EmployeeRecord;
