import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import styles from "./Style.module.css";
import EmployeeClaimHook from "./EmployeeClaimHook";
import KnowledgeImages from "../../assets/img/ic_work in progress per.png";

function EmployeeClaim() {
  return (
    <div className={styles.employeePerformaceWrapper}>
      <div className={styles.employeePerformacecontainer}>
        <div className={styles.imageWrapper}>
          <img src={KnowledgeImages} />
        </div>
        <span className={styles.title}>Work in Progress</span>
        <p>Something interesting is coming soon</p>
      </div>
    </div>
  );
}

export default EmployeeClaim;
