import React from "react";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import styles from "./EmployeeList.module.css";

function DesList({ data }) {
  console.log(">>",data)
  return (
    <div className={styles.editWrap}>
      <div className={styles.recordItem}>
        <div className={styles.tableComponentField}>
          <div className={styles.title}>
            {data?.title}{" "}
            <span className={styles.typeCont}>
              {data?.letter_type && ` - ${data?.letter_type} LETTER`}{" "}
              {data?.star_type && ` - ${data?.star_type} STAR`}
            </span>
          </div>
          <div className={styles.historyDes}>
            Letter Head Number:{" "}
            {data?.letter_head_no ? data?.letter_head_no : "-"}
          </div>
          <div className={styles.historyDes}>{data?.description}</div>
        </div>
        <div className={styles.tableAnnualField}>
          <StatusPill status={data?.type} />
        </div>
        <div className={styles.dateField}>
          <strong>{data?.dateOfIssueText}</strong>
          <br />
          <a
            href={data?.document}
            target={"_blank"}
            className={styles.letterLink}
          >
            View Letter
          </a>
        </div>
      </div>
      <div className={styles.responsiveView}>
        <div className={styles.topContainerHeader}>
          <div className={styles.title}>
            {data?.title}{" "}
            <span className={styles.typeCont}>
              {data?.letter_type && ` - ${data?.letter_type} LETTER`}{" "}
              {data?.star_type && ` - ${data?.star_type} STAR`}
            </span>
          </div>
          <div>
            <StatusPill status={data?.type} />
          </div>
        </div>
        <div className={styles.historyDes}>
          Letter Head Number:{" "}
          {data?.letter_head_no ? data?.letter_head_no : "-"}
        </div>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={styles.dateFieldMobile}>
            <strong className={styles.historyDes}>
              {data?.dateOfIssueText}
            </strong>
            <a
              href={data?.document}
              target={"_blank"}
              className={styles.letterLink}
            >
              View Letter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesList;
