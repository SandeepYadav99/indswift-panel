import React from "react";
import UtsavFaqListContainer from "./components/Faq/UtsavFaqList.container";
import styles from "./Style.module.css";

function HRUtsav() {
  return (
    <div className={styles.utsavContainer}>
      <div>
        <span className={styles.title}>Event Update</span>
        <div className={styles.newLine} />
        <UtsavFaqListContainer />
      </div>
    </div>
  );
}

export default HRUtsav;
