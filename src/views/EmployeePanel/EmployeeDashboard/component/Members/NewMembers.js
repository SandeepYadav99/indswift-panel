import React, { useRef } from "react";
import styles from "./Style.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pre from "../../../../../assets/img/ic_arrow_left.png";
import next from "../../../../../assets/img/ic_arrow_right.png";

const IndividualList = ({ data, isSperatedPage }) => {
  return (
    <div className={styles.newMemberCard}>
      <div className={styles.imageNameContainer}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.indImage}
            src={
              data?.image
                ? data?.image
                : require("../../../../../assets/img/image_guy.png")
            }
          />
        </div>
        <div className={styles.profileContainer}>
          <span className={styles.profileName}>{data?.name}</span>
          {isSperatedPage ? (
            <span className={styles.profilePosition}>{`${
              data?.separatedAt && data?.separatedAt
            } - ${data?.designation}`}</span>
          ) : (
            <span className={styles.profilePosition}>{`${
              data?.doj && data?.doj
            } - ${data?.designation}`}</span>
          )}

          <span
            className={styles.profilePosition}
          >{` ${data?.department} (${data?.location})`}</span>
        </div>
      </div>
    </div>
  );
};

function NewMembers({ data, isSperatedPage }) {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    width: 500,
    prevArrow: <img src={pre} />,
    nextArrow: <img src={next} />,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div className={"newMemberWrapper"}>
      <Slider
        {...settings}
        ref={sliderRef}
        className={styles.customSliderWrapper}
      >
        {data?.map((item, index) => (
          <IndividualList
            key={`joined_${index}`}
            data={item}
            isSperatedPage={isSperatedPage}
          />
        ))}
      </Slider>
    </div>
  );
}

export default NewMembers;
