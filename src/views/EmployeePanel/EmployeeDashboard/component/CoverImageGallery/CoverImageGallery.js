import React from "react";
import { useSelector } from "react-redux";
import GenericSliderCoverImage from "./CoverImageSlider";
import styles from "./Style.module.css";
function CoverImageGallery() {
  const { isTilesCalling, tiles } = useSelector(
    (state) => state.employeeDashboard
  );
  console.log("====>utsav", tiles.utsavEvents);
  return (
    <div className={styles.coverImageGalleryWrapper}>
      {/* {<div className={styles.imgWrapper}>
            <img
              className={styles.gallerImage}
              src="http://91.205.173.97:8111/public/hr_utsav/1676548972655_set1.jpg"
            />
            <div className={styles.blackStrip}>
              <label className={styles.textName}>hello</label>
            </div>
          </div>} */}
      {/* <GenericSliderCoverImage> */}
      <div className={styles.mappedImgWrapper}>
      {tiles?.utsavEvents.map((item) => {
        return (
          <div className={styles.imgWrapper}>
            <img
              className={styles.gallerImage}
              src={item.cover_image}
            />
            <div className={styles.blackStrip}>
              <label className={styles.textName}>hello</label>
            </div>
          </div>
        );
      })}
      </div>
      

      {/* </GenericSliderCoverImage> */}
    </div>
  );
}

export default CoverImageGallery;

{
  /* {tiles?.utsavEvents.map((item) => {
          return (
            <div className={styles.galleryImageWrapper}>
              <img className={styles.img} src={item?.image} />
            </div>
          );
        })} */
}
