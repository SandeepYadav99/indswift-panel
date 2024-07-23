import React, { useState } from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import rightSwip from "../../../assets/img/ic_right_swipe.png";
import leftSwip from "../../../assets/img/ic_left_swipe.png";
import successImage from "../../../assets/img/ic_punch_out_success@2x.png";
import SwipeButton from "react-swipezor";

const SwipButton = ({ swipRightPunch, swipLeftPunch, isSwip, isLeftSwip }) => {
  return (
    <div className={styles.buttonContainer}>
      {!isSwip || isLeftSwip ? (
        // <ButtonBase className={styles.swipBtn} onClick={swipRightPunch}>
        //   SWIPE RIGHT TO PUNCH IN <img src={rightSwip} alt="" className={styles.swipImage} />
        // </ButtonBase>
        <SwipeButton mainText="Swipe me" overlayText="S I K E" />
      ) : (
        <ButtonBase className={styles.swipLeftBtn} onClick={swipLeftPunch}>
          SWIPE LEFT TO PUNCH OUT{" "}
          <img src={leftSwip} alt="" className={styles.swipImage} />
        </ButtonBase>
      )}
    </div>
  );
};

export default SwipButton;
