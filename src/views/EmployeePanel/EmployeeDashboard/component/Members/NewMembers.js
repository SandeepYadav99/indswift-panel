import React, { useRef } from "react";
import styles from "./Style.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const IndividualList = () => {
  return (
    <div className={styles.newMemberCard}>
      <div className={styles.imageNameContainer}>
        <div className={styles.imageWrapper}>
          <img src={require("../../../../../assets/img/image_guy.png")} />
        </div>
        <div className={styles.profileContainer}>
          <span className={styles.profileName}>MR RISHAB MEHTA</span>
          <span className={styles.profilePosition}>5 Jan - Sr. Officer</span>
          <span className={styles.profileAddress}>Accounts (Mumbai)</span>
        </div>
      </div>
    </div>
  );
};

function NewMembers() {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    width: 500,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };
  return (
    <div className={styles.newMemberWrapper}>
      <Slider {...settings} ref={sliderRef} className={styles.customSliderWrapper}>
        <IndividualList />
        <IndividualList />
        <IndividualList />
        <IndividualList />
        <IndividualList />
        <IndividualList />
      </Slider>
    </div>
  );
}

export default NewMembers;
