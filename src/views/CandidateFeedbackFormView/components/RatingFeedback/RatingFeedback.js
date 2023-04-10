import React from "react";
import styles from "./Style.module.css";
import images from "./RatingImage";
import constants from "../../../../config/constants";
import classNames from "classnames";

function RatingFeedback({ title, question, feedback, ratingValue, isOverall }) {
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
        return `Unsatisfactory (${ratingNumber})`;
      case 2:
        return `Below Average (${ratingNumber})`;
      case 3:
        return `Average (${ratingNumber})`;
      case 4:
        return `Above Average (${ratingNumber})`;
      case 5:
        return `Exceptional (${ratingNumber})`;
    }
  };
  const selectionStatus=(status)=>{
    const getter=constants.JOB_CANDIDATE_STATUS_TEXT[status]
    return <span className={classNames( getter)}>{status}</span>
  }
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
        <div className={styles.lowerfeedback}>
          <div className={styles.titleWrapper}>
            <span>
              <span className={styles.ratingText}>Rating :</span>{" "}
              {ratingValue && !isOverall ? (
                getratingText(ratingValue)
              ) : isOverall ? (
                <span>{selectionStatus(isOverall)}</span>
              ) : (
                ""
              )}
            </span>
          </div>
          <div className={styles.questionWrapper}>
            <span>{feedback}</span>
          </div>
        </div>
      </div>
      {ratingValue && (
        <div className={styles.emojWrapper}>
          <div className={styles.emojCard}>
            <img src={images?.[getratingValues(ratingValue)]?.active} />
            {
              !isOverall && 
              <span>{images?.[getratingValues(ratingValue)]?.text}</span>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default RatingFeedback;
