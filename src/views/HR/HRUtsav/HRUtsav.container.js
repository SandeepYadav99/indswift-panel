import React, { useState } from "react";
import UtsavFaqListContainer from "./components/Faq/UtsavFaqList.container";
import styles from "./Style.module.css";
import useSubscriber from "../../../hooks/SubscriberHook";

function HRUtsav() {
  const {} = useSubscriber("UTSAV");
  return (
    <div className={styles.utsavContainer}>
      <div>
        <span className={styles.title}>Event Updates</span>
        <div className={styles.newLine} />
        <UtsavFaqListContainer isUtsavPage={true} />
      </div>
    </div>
  );
}

export default HRUtsav;
