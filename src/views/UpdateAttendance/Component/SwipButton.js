import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import rightSwip from "../../../assets/img/ic_right_swipe.png";
import leftSwip from "../../../assets/img/ic_left_swipe.png";
const SwipButton = ({ swipRightPunch, swipLeftPunch, isSwip, isLeftSwip }) => {
  console.log(isSwip);
  return (
    <div className={styles.buttonContainer}>
      {!isSwip || isLeftSwip ? (
        <ButtonBase className={styles.swipBtn} onClick={swipRightPunch}>
          SWIPE RIGHT TO PUNCH IN <img src={rightSwip} alt="" className={styles.swipImage} />
        </ButtonBase>
      ) : (
        <ButtonBase className={styles.swipLeftBtn} onClick={swipLeftPunch}>
          SWIPE LEFT TO PUNCH OUT <img src={leftSwip} alt="" className={styles.swipImage}/>
        </ButtonBase>
      )}
    </div>
  );
};

export default SwipButton;
