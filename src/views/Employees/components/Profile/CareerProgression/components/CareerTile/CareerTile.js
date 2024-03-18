import React from "react";
import styles from "./Style.module.css";

function CareerTile({image,name,percentage}) {
  return (
    <div className={styles.careerTileWrapper}>
      <div className={styles.careerInfoTile}>
        <div className={styles.careerImgContainer}>
          <img src={image} />
          <span>{name}</span>
        </div>
        <div className={styles.careerPercent}>
          <span>{percentage ? `${percentage}%`:''}</span>
        </div>
      </div>
    </div>
  );
}

export default CareerTile;
