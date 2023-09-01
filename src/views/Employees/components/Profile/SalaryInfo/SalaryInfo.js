import React from "react";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import SalaryInfoTable from "./SalaryInfoTable";
import styles from "./Style.module.css";

function SalaryInfo({Empid, isPending}) {

  return (
    <div className={styles.wrapper}>
      <SalaryInfoTable Empid={Empid} isPending={isPending}/>
      <GeneralInfo />
    </div>
  );
}

export default SalaryInfo;
