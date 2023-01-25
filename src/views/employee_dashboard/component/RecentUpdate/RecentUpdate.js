import React from "react";
import styles from "./Style.module.css";

function RecentUpdate() {
  return (
    <div className={styles.RecentUpdateContainer}>
      <div>
        <span className={styles.title}>Latest Announcements</span>
        <div className={styles.newLine} />
      </div>
      <div className={styles.description}>
        <p>
          Ind-Swift Laboratories has received Asia's Best Company of the year
          Awards 2022
        </p>
      </div>
      <div className={styles.description}>
        <p>
          Ind-Swift Laboratories has received Asia's Best Company of the year
          Awards 2022
        </p>
      </div>
      <div className={styles.description}>
        <p>
          Ind-Swift Laboratories has received Asia's Best Company of the year
          Awards 2022
        </p>
      </div>
    </div>
  );
}

export default RecentUpdate;
