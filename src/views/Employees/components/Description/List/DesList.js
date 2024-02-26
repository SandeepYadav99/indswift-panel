import React from "react";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import styles from "./EmployeeList.module.css";

function DesList({ data }) {
  return (
    <div className={styles.careerProgressionWrapper}>
      <div className={styles.recordItem}>
        <div className={styles.tableComponentField}>
          <div className={styles.left}>
            <img
              src={data?.createdBy?.image}
              alt="Image"
              className={styles.Image}
            />
          </div>
          <div className={styles.heading}>
            {data?.createdBy?.name ? data?.createdBy?.name : "-"}
            <div className={styles.historyDes}>{data?.designation?.name ? data?.designation?.name : "-"}</div>
          </div>
        </div>
        <div className={styles.dateWrap}>
         {data?.createdAtText}
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      <div className={styles.historyDes}>{data?.description}</div>
    </div>
  );
}

export default DesList;
