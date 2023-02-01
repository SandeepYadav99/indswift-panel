import React from "react";
import styles from "./Style.module.css";
import images from "./../../../../assets/img/ic_drishti_white.png";

function EngagementCard({ imageUrl, department, name }) {
  return (
    <div className={styles.engagementCardWrapper}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} className={styles.imagesDimension} />
      </div>
      <div className={styles.cardsDescriptionWrapper}>
        <span className={styles.cardName}>{name}</span>
        <span className={styles.cardProgram}>
          {department}
          <br /> Programs
        </span>
      </div>
    </div>
  );
}

export default EngagementCard;
