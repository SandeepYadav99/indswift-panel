import React, { useState } from "react";
import styles from "./Style.module.css";
import { useEffect } from "react";
import images from "./ExitRatingImages";

const ratings = [1, 2, 3, 4, 5];
function SpecialExitRatingView({
  title,
  question,
  handleChange,
  isError,
  isUpper,
}) {
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
          <span className={styles.performanceindex}>
            {isUpper ? "Excellent/Best" : "Excellent"}
          </span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(4)}>
          <img
            src={
              activeIndex == 4
                ? images?.above_average.active
                : images?.above_average.inactive
            }
          />
          <span className={styles.performanceindex}>
            {isUpper ? "Slightly more" : "Very good"}
          </span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(3)}>
          <img
            src={
              activeIndex == 3
                ? images?.average.active
                : images?.average.inactive
            }
          />
          <span className={styles.performanceindex}>
            {isUpper ? "Equivalent" : "Adequate"}
          </span>
        </div>
        <div className={styles.emojCard} onClick={(e) => handleClick(2)}>
          <img
            src={
              activeIndex == 2
                ? images?.below_average.active
                : images?.below_average.inactive
            }
          />
          <span className={styles.performanceindex}>
            {isUpper ? "Slightly less" : "Inadequate"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SpecialExitRatingView;
