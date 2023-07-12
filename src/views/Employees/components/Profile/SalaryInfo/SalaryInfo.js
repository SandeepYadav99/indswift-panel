import React from "react";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import SalaryInfoTable from "./SalaryInfoTable";
import styles from "./Style.module.css";

function SalaryInfo() {

  return (
    <div className={styles.wrapper}>
      <SalaryInfoTable />
      <GeneralInfo />
    </div>
  );
}

export default SalaryInfo;
