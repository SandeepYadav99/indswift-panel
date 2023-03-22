import React from "react";
import styles from "./Style.module.css";

const NomineeTile = ({ title }) => {
  const bankD = {};

  return (
    <div className={styles.nomineeWrapper}>
      <div className={styles.Nomineeheading}>{title}</div>
      <div className={styles.mainFlex}>
        <div className={styles.left}>
          <div className={styles.key}>
            <span className={styles.value}>Name:</span>
            {bankD?.name}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>DOB:</span>
            {bankD?.account_no}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.key}>
            <span className={styles.value}>Relation:</span>
            {bankD?.ifsc}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>Aadhar Number:</span>
            {bankD?.ifsc}
          </div>
        </div>
      </div>
    </div>
  );
};

function NomineeDetails() {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Nominee Details</div>
          <NomineeTile title="ESI" />
          <div className={styles.nomineeLine}></div>
          <NomineeTile title="PF" />
          <div className={styles.nomineeLine}></div>
          <NomineeTile title="Group Term" />
          <div className={styles.nomineeLine}></div>
          <NomineeTile title="Group Medi-claim" />
          <div className={styles.nomineeLine}></div>
          <NomineeTile title="Group Gratuity" />
        </div>
      </div>
    </div>
  );
}

export default NomineeDetails;
