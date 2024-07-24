import React, { useState } from "react";
import SwipeButton from "react-swipezor";
import rightSwip from "../../../assets/img/ic_right_swipe.png";
import leftSwip from "../../../assets/img/ic_left_swipe.png";
import successImage from "../../../assets/img/ic_punch_out_success@2x.png";
import styles from "./Style.module.css";
const SwipOutComponent = ({ leftSwipeDone, isLeftSwipDone }) => {
  return (
    <div>
      <SwipeButton
        mainText="SWIPE LEFT TO PUNCH OUT"
        overlayText=""
        classList={styles.swipLeftBtn}
        overlayClassList={styles.cartList}
        onSwipeDone={() => {
          leftSwipeDone();
        }}
        caret={
          // isLeftSwipDone !== "Done" ? (
          //   <img src={successImage}  className={styles.punchIn} />
          // ) : (
          <img src={rightSwip} />
          // )
        }
        reset={isLeftSwipDone}
      />
    </div>
  );
};

export default SwipOutComponent;
