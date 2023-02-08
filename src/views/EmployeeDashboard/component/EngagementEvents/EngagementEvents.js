import React from "react";
import styles from "./Style.module.css";
function EngagementEvents() {
  return (
    <div className={styles.engagementContainer}>
      <div>
        <span className={styles.title}>Employee Engagement Events</span>
        <div className={styles.newLine} />
      </div>
      <div className={styles.engagementImageContainer}>
        <div>
          <img
            className={styles.img}
            src={require("../../../../assets/img/ic_work in progress.png")}
          />
        </div>
        <div>
          <img
            className={styles.img}
            src={require("../../../../assets/img/ic_work in progress.png")}
          />
        </div>
        <div>
          <img
            className={styles.img}
            src={require("../../../../assets/img/ic_work in progress.png")}
          />
        </div>
      </div>
    </div>
  );
}

export default EngagementEvents;
