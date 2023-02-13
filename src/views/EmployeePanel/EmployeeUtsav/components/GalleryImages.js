import React from "react";
import styles from "./Style.module.css";
import GalleryImage from "../../../../assets/img/Gallery image 2.jpg";

function GalleryImages() {
  return (
    <div className={styles.imageGalleryWrapper}>
      <div className={styles.utsavGalleryImage}>
        <img className={styles.utsavImages} src={GalleryImage} />
        <div className={styles.imageTitle}>
          <span>Republic Day Celebrations</span>
        </div>
      </div>
    </div>
  );
}

export default GalleryImages;
