import React, { useState } from "react";
import styles from "./Style.module.css";
import one from "./../../../../assets/img/ic_1_inactive.png";
import activeone from "./../../../../assets/img/ic_1.png";
import two from "./../../../../assets/img/ic_2_inactive.png";
import activetwo from "./../../../../assets/img/ic_2.png";
import three from "./../../../../assets/img/ic_3_inactive.png";
import activethree from "./../../../../assets/img/ic_3.png";
import four from "./../../../../assets/img/ic_4_inactive.png";
import activefour from "./../../../../assets/img/ic_4.png";
import five from "./../../../../assets/img/ic_5_inactive.png";
import activefive from "./../../../../assets/img/ic_5.png";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
function PerformanceView({ title, question }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (index) => {
    // console.log("===>", typeof index);
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
        <div
          className={styles.emojCard}
          id="1"
          onClick={(e) => handleClick(e.target.id)}
        >
          <img id="1" src={activeIndex == 1 ? activeone : one} />
          <span id="1" className={styles.performanceindex}>
            Unsatisfactory
          </span>
          <span id="1">(Less than 30 %)</span>
        </div>
        <div
          className={styles.emojCard}
          id="2"
          onClick={(e) => handleClick(e.target.id)}
        >
          <img id="2" src={activeIndex == 2 ? activetwo : two} />
          <span id="2" className={styles.performanceindex}>
            Below Average
          </span>
          <span id="2">((b/w 30 % to 50%))</span>
        </div>
        <div
          className={styles.emojCard}
          id="3"
          onClick={(e) => handleClick(e.target.id)}
        >
          <img id="3" src={activeIndex == 3 ? activethree : three} />
          <span id="3" className={styles.performanceindex}>
            Average
          </span>
          <span id="3">((b/w 50 % to 70%))</span>
        </div>
        <div
          className={styles.emojCard}
          id="4"
          onClick={(e) => handleClick(e.target.id)}
        >
          <img id="4" src={activeIndex == 4 ? activefour : four} />
          <span id="4" className={styles.performanceindex}>
            Above Average
          </span>
          <span id="4">((b/w 70 % to 90 %))</span>
        </div>
        <div
          className={styles.emojCard}
          id="5"
          onClick={(e) => handleClick(e.target.id)}
        >
          <img id="5" src={activeIndex == 5 ? activefive : five} />
          <span id="5" className={styles.performanceindex}>
            Exceptional
          </span>
          <span id="5">((Above 90%))</span>
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
