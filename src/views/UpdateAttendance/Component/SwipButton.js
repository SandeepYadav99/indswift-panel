import React, { useState } from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import rightSwip from "../../../assets/img/ic_right_swip.png";
import leftSwip from "../../../assets/img/ic_left_swip.png";
const SwipButton = () => {
  const [isSwip, setIsSwip]=useState(false);
  return (
    <div className={styles.buttonContainer}>
      <ButtonBase className={styles.swipBtn}>
        SWIPE RIGHT TO PUNCH IN <img src={rightSwip} alt=""/>
      </ButtonBase>
    </div>
  );
};

export default SwipButton;
