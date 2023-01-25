import React from "react";
import styles from "./Style.module.css";

function ThemeInfo() {
  return (
    <div className={styles.userInfoWrapper}>
      <div className={styles.themeContainer}>
        <div>
          <p className={styles.themeInfoUpper}>
            Theme of the Month - January 2022
          </p>
        </div>
        <div className={styles.themeInfoLower}>
          <p>Better Environment, Better Tomorrow. Save The Planet Earth.</p>
        </div>
      </div>
    </div>
  );
}

export default ThemeInfo;
