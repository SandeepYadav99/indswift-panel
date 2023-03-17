import React from "react";
import styles from "./Style.module.css";
import images from "./RatingImage";

function RatingFeedback({ title, question, rating, feedback, ratingValue }) {
  const ratingValues = [1, 2, 3, 4, 5];
  const getratingValues = (rating) => {
    switch (rating) {
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
      default:
        return "zero";
    }
  };
  console.log("===>", getratingValues(3));
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
              {" "}
              <span className={styles.ratingText}>Rating :</span> {rating}
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
            <img src={images?.[getratingValues(5)].active} />
            {/* <span className={styles.performanceindex}>Below Average</span> */}
            <span>{images?.[getratingValues(1)]?.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RatingFeedback;
