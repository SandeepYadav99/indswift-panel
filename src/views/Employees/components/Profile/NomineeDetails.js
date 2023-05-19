import React from "react";
import styles from "./Style.module.css";
import { removeUnderScore } from "../../../../helper/helper";

const NomineeTile = ({ data }) => {
  return (
    <div className={styles.nomineeWrapper}>
      <div className={styles.Nomineeheading}>
        {data?.type === "MEDI_CLAIM"
          ? " GROUP MEDI CLAIM"
          : removeUnderScore(data?.type)}
      </div>
      <div className={styles.mainFlex}>
        <div className={styles.left}>
          <div className={styles.key}>
            <span className={styles.value}>Name:</span>
            {data?.name}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>DOB:</span>
            {data?.dob}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.key}>
            <span className={styles.value}>Relation:</span>
            {data?.relation}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>Aadhar Number:</span>
            {data?.aadhar_no}
          </div>
        </div>
      </div>
    </div>
  );
};

function NomineeDetails({ nominee }) {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Nominee Details</div>
          {nominee?.map((item, index) => {
            return (
              <div key={`nominee_${index}`}>
                <NomineeTile data={item} />
                {nominee?.length - 1 !== index && (
                  <div className={styles.nomineeLine}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NomineeDetails;
