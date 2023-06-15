import React from "react";
import styles from "./Style.module.css";
import image from "../../../../../assets/img/download.png";

function TravelUpperCard({ data ,isImprest}) {
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Employee Information</div>
        </div>

        <div className={styles.mainFlex}>
          <div className={styles.left221}>
            <div>
              <img
                className={styles.claimimg}
                src={data?.image ? data?.image : image}
              />
            </div>
            <div>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {data?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Employee ID:</span>
                {data?.emp_code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data?.location?.name}
              </div>
              {!isImprest && data?.experience?.current && (
                <div className={styles.key}>
                  <span className={styles.value}>
                    Experience with Organization:
                  </span>
                  {data?.experience?.current > 1
                    ? `${data?.experience?.current} yrs`
                    : `${data.experience.current} yr`}
                </div>
              )}
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Designation:</span>
              {data?.designation?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Grade/Cadre:</span>
              {`${data?.grade?.code} / ${data?.cadre?.code}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Department:</span>
              {data?.department?.name}
            </div>
            { !isImprest && data?.experience?.total && (
              <div className={styles.key}>
                <span className={styles.value}>Total Experience:</span>
                {data?.experience?.total > 1
                  ? `${data?.experience?.total} yrs`
                  : `${data.experience.total} yr`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelUpperCard;
