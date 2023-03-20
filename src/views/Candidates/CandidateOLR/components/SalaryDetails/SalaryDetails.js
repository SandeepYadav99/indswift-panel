import React from "react";
import styles from "./Style.module.css";
function SalaryDetails() {
  const data = {};
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainerPersonal}>
        <div className={styles.mainFlex2}>
          <div className={styles.left}>
            <div className={styles.heading}>CTC Details</div>
            <div className={styles.key}>
              <span className={styles.value}>Gross:</span>
              <span className={styles.valueWrap}>{data?.dob}</span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>PLI:</span>
              <span className={styles.valueWrap}>{data?.gender}</span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Stability Allowance:</span>
              <span className={styles.valueWrap}>{data?.gender}</span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Others (Er PF, Gratuity, Bonus, MC):</span>
              <span className={styles.valueWrap}>{data?.gender}</span>
            </div><div className={styles.key}>
              <span className={styles.value}>Total CTC:</span>
              <span className={styles.valueWrap}>{data?.gender}</span>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.heading}>Additional Details</div>

            <div className={styles.key}>
              <span className={styles.value}>Annualized Value Change from Replaced Cost:</span>
              <span className={styles.valueWrap}>
                {data?.family?.martial_status}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>% Change from Replaced Cost:</span>
              <span className={styles.valueWrap}>
                {data?.family?.spouse_dob}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Annualized Value Change WRT past CTC:</span>
              <span className={styles.valueWrap}>
                {/* {data?.family?.spouse_gender} */}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>% Hike Offered to Candidate WRT past CTC:</span>
              <span className={styles.valueWrap}>
                {/* {data?.family?.spouse_gender} */}
              </span>
            </div><div className={styles.key}>
              <span className={styles.value}>AMRF Available:</span>
              <span className={styles.valueWrap}>
                
                {/* {data?.family?.spouse_gender} */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaryDetails;
