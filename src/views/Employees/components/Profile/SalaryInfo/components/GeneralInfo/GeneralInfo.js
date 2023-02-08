import React from "react";
import styles from "./Style.module.css";

function GeneralInfo() {
  return (
    <div className={styles.GeneralInfoWrapeer}>
      <div>
        <span className={styles.title}>General Information</span>
        <div className={styles.newLine} />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.infoDetails}>
          If there is any <strong className={styles.infoStrong}>PLI</strong>{" "}
          mentioned in your salary table, then it stands for
          <strong className={styles.infoStrong}>
            {" "}
            “Performance Linked Incentive”
          </strong>
          . You will be eligible for PLI upto the amount mentioned in table of
          your increment letter on quarterly basis as per the company’s
          performance linked incentive policy.
        </p>
        <br />
        <strong className={styles.infoStrong}>
          Your net CTC is made of various tenure based, Statutory and
          choice-based components like Gratuity, Er PF, Er ESI, Er LWF, GMC
          Allowance, Performance Bonus, Stability Allowance, Retention Bonus,
          Statutory Bonus, Petrol, Car Maintenance, Driver Allowance etc that
          are subject of realization/payment only when you meet the
          legal/organizational conditions of respective components, and these
          components are always dynamic. Therefore, CTC figure is not a
          guaranteed income by any means.
        </strong>{" "}
        <p className={styles.infoDetails}>
          Stability allowance is paid on completing agreed years of service (2 /
          3 years) in organization. Performance & Retention Allowance is paid as
          per agreed schemata with employee. Paid up PA/RA is deductible if the
          employee does not complete the underlying conditions of
          performance/service tenure.
        </p>
        <p className={styles.infoDetails}>
          For other details of T&Cs of tenure-based payments employees may
          please refer the compensation policy of organization.
        </p>
      </div>
    </div>
  );
}

export default GeneralInfo;
