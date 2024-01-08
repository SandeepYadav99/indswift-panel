import React from "react";
import styles from "./Style.module.css";
import image from "../../../../../assets/img/download.png";

function UpperClaimInfo({ data, isLoc, isLoan  }) {
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Employee Information</div>
        </div>

        <div className={styles.mainFlex}>
          <div className={styles.left221}>
            <div className={styles.imageContainer}>
              <img
                className={styles.claimimg}
                src={data?.image ? data?.image : image}
              />
            </div>
            <div className={styles.nameData}>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {data?.employee?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Employee ID:</span>
                {data?.employee?.emp_code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data?.employee?.location?.name}
              </div>
              {(isLoc || isLoan) && (
                <div className={styles.key}>
                  <span className={styles.value}>Date of Joining:</span>
                  {data?.employee?.dojText}
                </div>
              )}
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.nameHigher}>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                <span>{data?.employee?.name}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Employee ID:</span>
                <span>{data?.employee?.emp_code}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                <span>{data?.employee?.location?.name}</span>
              </div>
              {(isLoc || isLoan) && (
                <div className={styles.key}>
                  <span className={styles.value}>Date of Joining:</span>
                  <span>{data?.employee?.dojText}</span>
                </div>
              )}
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.leftPartMarginMobile}>
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                <span>{data?.employee?.designation?.name}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Grade/Cadre:</span>
                <span>{`${data?.employee?.grade?.code} / ${data?.employee?.cadre?.code}`}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                <span>{data?.employee?.department?.name}</span>
              </div>
              {isLoan && (
                <div className={styles.key}>
                  <span className={styles.value}>
                    Experience with Organization:
                  </span>
                  <span> {data?.employee?.experience?.current}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperClaimInfo;
