import React from "react";
import styles from "./Style.module.css";
import images from "./RatingImage";
import classNames from "classnames";
import constants from "../../../../../config/constants";

function ExitRatingFeedback({ title, question, feedback, ratingValue }) {
  const getratingValues = (ratingNum) => {
    const ratingNumber = parseInt(ratingNum);
    switch (ratingNumber) {
      case 1:
        return "one";
      case 2:
        return "two";
      case 3:
        return "three";
      case 4:
        return "four";
      case 5:
        return "five";
    }
  };
  const getratingText = (ratingNum) => {
    const ratingNumber = parseInt(ratingNum);
    switch (ratingNumber) {
      case 1:
        return `Cannot say`;
      case 2:
        return `Strongly disagree`;
      case 3:
        return `Somewhat disagree`;
      case 4:
        return `Somewhat agree`;
      case 5:
        return `Strongly agree`;
    }
  };
  return (
    <div className={styles.PerformanceViewWrapper}>
      <div className={styles.feedbackContainer}>
        <div className={styles.upperfeedback}>
          <div className={styles.titleWrapper}>
            <span>{title}</span>
          </div>
          <div className={styles.questionWrapper}>
            <span>{question}</span>
          </div>
        </div>
      </div>
      {ratingValue && (
        <div className={styles.emojWrapper}>
          <div className={styles.emojCard}>
            <img src={images?.[getratingValues(ratingValue)]?.active} />
            <span>{images?.[getratingValues(ratingValue)]?.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExitRatingFeedback;
