import React from "react";
import { useSelector } from "react-redux";
import GenericSliderCoverImage from "./CoverImageSlider";
import styles from "./Style.module.css";
import GenricSlider from "../Members/GenricSlider";
function CoverImageGallery() {
  const { isTilesCalling, tiles } = useSelector(
    (state) => state.employeeDashboard
  );


  return (
    <div className={styles.coverImageGalleryWrapper}>
        <GenricSlider sliderSettings={{  slidesToShow: 1,speed:3000 }}>
            {tiles?.utsavEvents.map((item) => {
                return (
                    <div className={styles.imgWrapper}>
                        <img
                            className={styles.gallerImage}
                            src={item.cover_image}
                        />
                        <div className={styles.blackStrip}>
                            <label className={styles.textName}>{item?.name}</label>
                        </div>
                    </div>
                );
            })}
        </GenricSlider>

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
