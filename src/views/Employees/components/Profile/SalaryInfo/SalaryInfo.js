import React from "react";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import SalaryInfoTable from "./SalaryInfoTable";
import styles from "./Style.module.css";

function SalaryInfo({Empid, isPending}) {

  return (
    <div className={styles.wrapper}  id="content-to-print">
      <SalaryInfoTable Empid={Empid} isPending={isPending}/>
      <div className={styles.innerWidthHide}>
      <GeneralInfo />
      </div>
    </div>
  );
}

export default SalaryInfo;
