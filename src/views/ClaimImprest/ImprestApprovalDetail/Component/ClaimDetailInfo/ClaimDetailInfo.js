import React from "react";
import styles from "./Style.module.css";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import { getCurrency } from "../../../../../helper/helper";

function ClaimDetailInfo({ idCards }) {
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };

  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.heading}>Claim Details</div>
          {/* <div>
            <StatusPill status={removeUnderScore(idCards?.status)} />
          </div> */}
        </div>
        <div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Imprest Required for:</span>
                {removeUnderScore(idCards?.imprest?.imprestTypeText)}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Tour Dates:</span>
                {idCards?.imprest?.travelPlanner?.startDateText } - {idCards?.imprest?.travelPlanner?.endDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Tour Type:</span>
                {idCards?.imprest?.tour_type}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Balance Outstanding:</span>
                {idCards?.balance?.balance &&
                  `${getCurrency(idCards?.imprest?.currency)} ${idCards?.balance?.balance}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Sanctionable Amount:</span>
                {idCards?.imprest?.sanctionable_amount &&
                  `${getCurrency(idCards?.imprest?.currency)} ${idCards?.imprest?.sanctionable_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Comment:</span>
                {idCards?.comment}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Assoicated TAP:</span>
                {idCards?.imprest?.travelPlanner?.code ? idCards?.imprest?.travelPlanner?.code : 'N/A'}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Status:</span>
                {idCards?.imprest?.travelPlanner?.status ? <StatusPill status={removeUnderScore(idCards?.imprest?.travelPlanner?.status)}/> : 'N/A'}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Max Entitled:</span>
                {idCards?.balance?.entitled && `${getCurrency(idCards?.imprest?.currency)} ${idCards?.balance?.entitled}`}
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Required Amount:</span>
                {idCards?.imprest?.amount && `${getCurrency(idCards?.imprest?.currency)} ${idCards?.imprest?.amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Purpose:</span>
                {idCards?.imprest?.purpose}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimDetailInfo;
