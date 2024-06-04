import React from "react";
import { useSelector } from "react-redux";
import GenericSliderCoverImage from "./CoverImageSlider";
import styles from "./Style.module.css";
import GenricSlider from "../Members/GenricSlider";
function CoverImageGallery() {
  const { isTilesCalling, tiles } = useSelector(
    (state) => state.employeeDashboard
  );
  const tilelength = tiles?.utsavEvents?.length;
  return (
    <div className={styles.coverImageGalleryWrapper}>
      <GenricSlider sliderSettings={{ slidesToShow: 1, speed: 3000 }}>
        {tiles?.utsavEvents.map((item, index) => {
          return (
            <div className={styles.imgWrapper} key={`CoverImage_${index}`}>
              <img className={styles.gallerImage} src={item?.cover_image} />
              <div className={styles.gallaryDesWrapper}>
                <label className={styles.textName}>{item?.name}</label>
                <label>{`${index + 1} / ${tilelength}`}</label>
              </div>
            </div>
          );
        })}
      </GenricSlider>
    </div>
  );
}

export default CoverImageGallery;
