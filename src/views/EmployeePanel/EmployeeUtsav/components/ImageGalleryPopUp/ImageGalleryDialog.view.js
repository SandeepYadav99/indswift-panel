import React, { useEffect } from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import useImageGalleryDialogHook from "./ImageGalleryDialog.hook";
import { Close } from "@material-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import pre from "../../../../../assets/img/ic_arrow_left.png";
import next from "../../../../../assets/img/ic_arrow_right.png";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageGalleryDialog = ({ isOpen, handleToggle, candidateId, data,currentIndex }) => {
  console.log('currentIndex',currentIndex)
  useEffect(()=>{
  },[currentIndex])
  const {} = useImageGalleryDialogHook({ isOpen, handleToggle, candidateId });
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    width: 500,
    prevArrow: <img src={pre} />,
    nextArrow: <img src={next} />,
    initialSlide: currentIndex,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        keepMounted
        TransitionComponent={Transition}
        open={isOpen}
        onClose={handleToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.InterviewPopUpWrapper}>
          <div className={styles.closeWrap}>
            <div className={styles.dialogWrapper}>
              <div>{data?.name}</div>
              <div className={styles.newLine}></div>
            </div>
            <Close
              style={{ cursor: "pointer", marginRight: "1.2rem" }}
              onClick={handleToggle}
            ></Close>
          </div>
          <div>
            <Slider
              {...settings}
              ref={sliderRef}
              className={styles.customSliderWrapper}
            >
              {data?.images?.map((item, index) => (
                <div className={styles.imgWrapper} key={`galler_${index}`}>
                  <img src={item.image} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageGalleryDialog;
