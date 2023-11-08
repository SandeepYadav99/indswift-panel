import React from "react";
import styles from "./Style.module.css";
import images from "./RatingImage";

function ExitRatingFeedback({ title, question, ratingValue, des, helper }) {
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
            {helper ? (
              <span>{images?.[getratingValues(ratingValue)]?.helper}</span>
            ) : des ? (
              <span>{images?.[getratingValues(ratingValue)]?.des}</span>
            ) : (
              <span>{images?.[getratingValues(ratingValue)]?.text}</span>
            )}
            {/* <span>{images?.[getratingValues(ratingValue)]?.text}</span> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExitRatingFeedback;
