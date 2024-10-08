import React, { useState } from "react";
import styles from "./Style.module.css";
import { useEffect } from "react";
import images from "./ExitRatingImages";

const ratings = [1, 2, 3, 4, 5];
function ExitRatingView({ title, question, handleChange, isError }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    handleChange && handleChange(ratings[activeIndex - 1]);
  }, [activeIndex]);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div
      className={styles.PerformanceViewWrapper}
      style={{ backgroundColor: isError ? "#ff000010" : "#FFF" }}
    >
      <div className={styles.titleWrapper}>
        <span>{title}</span>
      </div>
      <div className={styles.questionWrapper}>
        <span>{question}</span>
      </div>
      <div className={styles.emojWrapper}>
        <div className={styles.emojCard} onClick={(e) => handleClick(5)}>
          <img
            src={
              activeIndex == 5
                ? images?.exceptional.active
                : images?.exceptional.inactive
            }
          />
          <span className={styles.performanceindex}>Strongly agree</span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(4)}>
          <img
            src={
              activeIndex == 4
                ? images?.above_average.active
                : images?.above_average.inactive
            }
          />
          <span className={styles.performanceindex}>Somewhat agree</span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(3)}>
          <img
            src={
              activeIndex == 3
                ? images?.average.active
                : images?.average.inactive
            }
          />
          <span className={styles.performanceindex}>Somewhat disagree</span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(2)}>
          <img
            src={
              activeIndex == 2
                ? images?.below_average.active
                : images?.below_average.inactive
            }
          />
          <span className={styles.performanceindex}>Strongly disagree</span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(1)}>
          <img
            src={
              activeIndex == 1
                ? images?.unsatisfactortory.active
                : images?.unsatisfactortory.inactive
            }
          />
          <span className={styles.performanceindex}>Cannot say</span>
        </div>
      </div>
    </div>
  );
}

export default ExitRatingView;
