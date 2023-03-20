import React from "react";
import styles from "./Style.module.css";
function EventDetailCard({ data }) {
  return (
    <div className={styles.eventDetailCardWrapper}>
      <div className={styles.eventDetailCard}>
        <div className={styles.Row}>
          <span className={styles.rowtags}>{data?.title}</span>
          <span className={styles.rowtags}>{data?.createdAtText}</span>
        </div>
        <div className={styles.Row}>
          <span className={styles.rowtagsLower}>{data?.description}</span>
          {data?.employee?.name && (
            <span className={styles.rowtagsLower1}>
              Updated by: {data?.employee?.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailCard;
