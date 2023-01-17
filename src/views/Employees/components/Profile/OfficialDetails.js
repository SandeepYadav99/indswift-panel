import React from "react";
import styles from "./Style.module.css";

const OfficialDetails = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Official Details</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>DOJ:</span>
                <span className={styles.valueWrap}>{data?.doj}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Experience With Org:</span>

                {data?.experience?.current && (
                  <span className={styles.valueWrap}>
                    {data?.experience?.current > 1
                      ? `${data?.experience?.current} yrs`
                      : `${data.experience.current} yr`}
                  </span>
                )}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Previous Org:</span>
                <span className={styles.valueWrap}>
                  {data?.experience?.previous_organisation}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Past Experience:</span>
                {data?.experience?.before && (
                  <span className={styles.valueWrap}>
                    {data?.experience?.before > 1
                      ? `${data?.experience?.before} yrs`
                      : `${data.experience.before} yr`}
                  </span>
                )}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Total Experience:</span>
                {data?.experience?.total && (
                  <span className={styles.valueWrap}>
                    {data?.experience?.total > 0
                      ? `${data?.experience?.total} yrs`
                      : `${data?.experience?.total} yr`}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Grade:</span>
                <span className={styles.valueWrap}>{data?.grade?.code}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Cadre:</span>
                <span className={styles.valueWrap}>-</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Level:</span>
                <span className={styles.valueWrap}>{data?.grade?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialDetails;
