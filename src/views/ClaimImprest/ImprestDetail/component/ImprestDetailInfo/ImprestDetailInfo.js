import React from "react";
import styles from "./Style.module.css";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import { getCurrency } from "../../../../../helper/helper";

function ImprestDetailInfo({ idCards }) {
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.heading}>Imprest Request Form</div>
          <div>
            <StatusPill status={removeUnderScore(idCards?.status)} />
          </div>
        </div>
        {idCards?.imprestTypeText && idCards?.imprestTypeText === "Travel" && (
          <div>
            <div className={styles.mainFlex}>
              <div className={styles.left}>
                <div className={styles.key}>
                  <span className={styles.value}>Imprest Required for:</span>
                  {idCards?.imprestTypeText}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Associated TAP:</span>
                  {idCards?.travelPlanner?.code}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Tour Dates:</span>
                  {idCards?.travelPlanner?.startDateText} -{" "}
                  {idCards?.travelPlanner?.endDateText}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Max Entitled:</span>
                  {idCards?.balance?.entitled &&
                    `${getCurrency(idCards?.currency)} ${
                      idCards?.balance?.entitled
                    }`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Required Amount:</span>
                  {idCards?.amount &&
                    `${getCurrency(idCards?.currency)} ${idCards?.amount}`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Describe the Purpose:</span>
                  {idCards?.purpose}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.key}>
                  <span className={styles.value}>TAP No:</span>
                  {idCards?.travelPlanner?.code}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Tour Type:</span>
                  {idCards?.tour_type}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Status:</span>
                  {<StatusPill status={idCards?.travelPlanner?.status} />}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Balance Outstanding:</span>
                  {idCards?.balance?.balance &&
                    `${getCurrency(idCards?.currency)} ${
                      idCards?.balance?.balance
                    }`}
                </div>

                <div className={styles.key}>
                  <span className={styles.value}>Sanctionable Amount:</span>
                  {idCards?.sanctionable_amount &&
                    `${getCurrency(idCards?.currency)}  ${
                      idCards?.sanctionable_amount
                    }`}
                </div>
              </div>
            </div>
          </div>
        )}

        {idCards?.imprestTypeText && idCards?.imprestTypeText === "Other" && (
          <div>
            <div className={styles.mainFlex}>
              <div className={styles.left}>
                <div className={styles.key}>
                  <span className={styles.value}>Imprest Required for:</span>
                  {idCards?.imprestTypeText}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Max Entitled:</span>
                  {idCards?.balance?.entitled &&
                    `${getCurrency(idCards?.currency)} ${
                      idCards?.balance?.entitled
                    }`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Required Amount:</span>
                  {idCards?.amount &&
                    `${getCurrency(idCards?.currency)} ${idCards?.amount}`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Describe the Purpose:</span>
                  {idCards?.purpose}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.key}>
                  <span className={styles.value}>TAP No:</span>
                  {idCards?.code}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Balance Outstanding:</span>
                  {idCards?.balance?.balance &&
                    `${getCurrency(idCards?.currency)} ${
                      idCards?.balance?.balance
                    }`}
                </div>

                <div className={styles.key}>
                  <span className={styles.value}>Sanctionable Amount:</span>
                  {idCards?.sanctionable_amount &&
                    `${getCurrency(idCards?.currency)}  ${
                      idCards?.sanctionable_amount
                    }`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImprestDetailInfo;
