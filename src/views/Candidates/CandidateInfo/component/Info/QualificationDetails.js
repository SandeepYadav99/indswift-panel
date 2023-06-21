import React, { useEffect } from "react";
import styles from "./Style.module.css";
import { removeUnderScore } from "../../../../../helper/helper";

const QualificationDetails = ({ data ,other}) => {
  const dataLength = data?.length - 1;
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Qualifications Details</div>
          {data?.length > 0 &&
            data?.map((item, index) => (
              <>
                <div className={styles.mainFlex} key={`quali_${index}`}>
                  <div className={styles.left}>
                    <div className={styles.key}>
                      <span className={styles.value}>Qualification:</span>
                      <span className={styles.valueWrap}>
                        {item?.qualification}
                      </span>
                    </div>

                    <div className={styles.key}>
                      <span className={styles.value}>
                        Name of degree/ Specialization:
                      </span>
                      <span className={styles.valueWrap}>
                        {item?.degree_name}
                      </span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Institute/University:
                      </span>
                      <span className={styles.valueWrap}>
                        {item?.institute_name}
                      </span>
                    </div>
                  </div>
                  <div className={styles.vertical}></div>
                  <div className={styles.right}>
                    <div className={styles.key}>
                      <span className={styles.value}>Passing Year:</span>
                      <span className={styles.valueWrap}>
                        {item?.passing_year}
                      </span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Percentage/ CGPA:</span>
                      <span className={styles.valueWrap}>{item?.cgpa}</span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Degree Type:</span>
                      <span className={styles.valueWrap}>
                        {removeUnderScore(item?.degree_type)}
                      </span>
                    </div>
                  </div>
                </div>
                {dataLength !== index && (
                  <div className={styles.horizontalLine}></div>
                )}
              </>
            ))}
          <div className={styles.horizontalLine}></div>
          <div className={styles.key}>
            <span className={styles.value}>Other Professional Certifications (if any):</span>
            <span className={styles.valueWrap}>{other}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationDetails;
