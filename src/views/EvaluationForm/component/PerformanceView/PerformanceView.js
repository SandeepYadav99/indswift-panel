import React, { useState } from "react";
import styles from "./Style.module.css";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import { useEffect } from "react";
import images from "./PerformanceImages";

const ratings = [1, 2, 3, 4, 5];
function PerformanceView({ type, title, question, handleChange }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [note, setNote] = useState("");

  useEffect(() => {
    handleChange &&
      handleChange(type, { value: ratings[activeIndex - 1], note: note });
  }, [activeIndex, note]);

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
        <div className={styles.emojCard} onClick={(e) => handleClick(1)}>
          <img
            src={
              activeIndex == 1
                ? images?.unsatisfactortory.active
                : images?.unsatisfactortory.inactive
            }
          />
          <span className={styles.performanceindex}>Unsatisfactory</span>
          <span id="1">(Less than 30 %)</span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(2)}>
          <img
            src={
              activeIndex == 2
                ? images?.below_average.active
                : images?.below_average.inactive
            }
          />
          <span className={styles.performanceindex}>Below Average</span>
          <span>((b/w 30 % to 50%))</span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(3)}>
          <img
            src={
              activeIndex == 3
                ? images?.average.active
                : images?.average.inactive
            }
          />
          <span className={styles.performanceindex}>Average</span>
          <span>((b/w 50 % to 70%))</span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(4)}>
          <img
            src={
              activeIndex == 4
                ? images?.above_average.active
                : images?.above_average.inactive
            }
          />
          <span className={styles.performanceindex}>Above Average</span>
          <span>((b/w 70 % to 90 %))</span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(5)}>
          <img
            src={
              activeIndex == 5
                ? images?.exceptional.active
                : images?.exceptional.inactive
            }
          />
          <span className={styles.performanceindex}>Exceptional</span>
          <span>((Above 90%))</span>
        </div>
      </div>
      <div>
        <CustomTextField
          // isError={errorData?.note}
          // errorText={errorData?.note}
          label={"Please write related Comments"}
          value={note}
          onTextChange={(text) => {
            setNote(text);
          }}
          multiline
          rows={3}
        />
      </div>
    </div>
  );
}

export default PerformanceView;
