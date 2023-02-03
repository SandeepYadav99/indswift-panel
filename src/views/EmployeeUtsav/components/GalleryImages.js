import React from "react";
import styles from "./Style.module.css";
import DeepakImage from "../../../assets/img/deepak illustartion.png";

function GalleryImages() {
  return (
    <div className={styles.imageGalleryWrapper}>
      {/* <img src={DeepakImage} /> */}
      <div className={styles.utsavGalleryImage}></div>
      <div className={styles.imageTitle}>hek</div>
    </div>
  );
}

export default GalleryImages;
