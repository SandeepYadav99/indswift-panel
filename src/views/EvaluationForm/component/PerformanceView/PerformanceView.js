import React, { useState } from "react";
import styles from "./Style.module.css";
import one from "./../../../../assets/img/ic_1_inactive.png";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
function PerformanceView({ title, question }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <div className={styles.PerformanceViewWrapper}>
      <div className={styles.titleWrapper}>
        <span>{title}</span>
      </div>
      <div className={styles.questionWrapper}>
        <span>{question}</span>
      </div>
      <div className={styles.emojWrapper}>
        <div className={styles.emojCard}>
          <img src={one} />
          <span className={styles.performanceindex}>Unsatisfactory</span>
          <span>(Less than 30 %)</span>
        </div>
        <div className={styles.emojCard}>
          <img src={one} />
          <span>Unsatisfactory</span>
          <span>(Less than 30 %)</span>
        </div>
        <div className={styles.emojCard}>
          <img src={one} />
          <span>Unsatisfactory</span>
          <span>(Less than 30 %)</span>
        </div>
        <div className={styles.emojCard}>
          <img src={one} />
          <span>Unsatisfactory</span>
          <span>(Less than 30 %)</span>
        </div>
        <div className={styles.emojCard}>
          <img src={one} />
          <span>Unsatisfactory</span>
          <span>(Less than 30 %)</span>
        </div>
      </div>
      <div>
        <CustomTextField
          // isError={errorData?.note}
          // errorText={errorData?.note}
          label={"Please write related Comments"}
          // value={form?.note}
          // onTextChange={(text) => {
          //   changeTextData(text, "note");
          // }}
          // onBlur={() => {
          //   onBlurHandler("note");
          // }}
          multiline
          rows={3}
        />
      </div>
    </div>
  );
}

export default PerformanceView;
