import React from "react";
import styles from "./Style.module.css";

const FamilyInfo = ({ family }) => {
  const dataLength = family?.length - 1;
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Family Details </div>
          {family?.length > 0 &&
            family?.map((item, index) => (
              <>
                <div className={styles.mainFlex} key={`family_${index}`}>
                  <div className={styles.left}>
                    <div className={styles.key}>
                      <span className={styles.value}>Relation:</span>
                      <span className={styles.valueWrap}>{item?.relation}</span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Name:</span>
                      <span className={styles.valueWrap}>{item?.name}</span>
                    </div>
                  </div>
                  <div className={styles.horizontal}></div>
                  <div className={styles.right}>
                    <div className={styles.key}>
                      <span className={styles.value}>DOB:</span>
                      <span className={styles.valueWrap}>{item?.dob}</span>
                    </div>{" "}
                    <div className={styles.key}>
                      <span className={styles.value}>Occupation:</span>
                      <span className={styles.valueWrap}>
                        {item?.occupation}
                      </span>
                    </div>
                  </div>
                </div>
                {dataLength !== index && (
                  <div className={styles.horizontalLine}></div>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyInfo;
