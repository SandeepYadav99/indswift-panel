import React from "react";
import styles from "./Style.module.css";
import GalleryImage from "../../../../assets/img/Gallery image 2.jpg";

function GalleryImages({ name, imageUrl, onClick }) {
  return (
    <div className={styles.imageGalleryWrapper} onClick={onClick}>
      <div className={styles.utsavGalleryImage}>
        <div className={styles.wrapper}>
          <img className={styles.utsavImages} src={imageUrl} />
        </div>
      </div>
      <div className={styles.imageTitle}>
        <span>{name}</span>
      </div>
    </div>
  );
}

export default GalleryImages;
