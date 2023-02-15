import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export default function GenericSlider({ children }) {
  const settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    dots: false,
    infinite: true,
    nav: false,
    accessibility: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
  };

  return (
      <Slider {...settings}>
          {children}
      </Slider>
  );
}
