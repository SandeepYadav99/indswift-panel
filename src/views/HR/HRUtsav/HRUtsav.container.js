import React, { useState } from "react";
import UtsavFaqListContainer from "./components/Faq/UtsavFaqList.container";
import styles from "./Style.module.css";

function HRUtsav() {
  const [isUtsavPage,setIsUtsavPage]=useState(true)
  return (
    <div className={styles.utsavContainer}>
      <div>
        <span className={styles.title}>Event Updates</span>
        <div className={styles.newLine} />
        <UtsavFaqListContainer  isUtsavPage={isUtsavPage}/>
      </div>
    </div>
  );
}

export default HRUtsav;
