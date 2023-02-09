import React from "react";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import SalaryInfoHook from "./SalaryInfoHook";
import SalaryInfoTable from "./SalaryInfoTable";
import styles from "./Style.module.css";

function SalaryInfo() {
  const { EmployeeSalaryInfo: data } = SalaryInfoHook({});
  console.log("===>", data);

  return (
    <div className={styles.wrapper}>
      <SalaryInfoTable />
      <GeneralInfo />
    </div>
  );
}

export default SalaryInfo;
