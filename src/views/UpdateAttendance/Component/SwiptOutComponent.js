import React, { useState } from "react";
import SwipeButton from "react-swipezor";
import rightSwip from "../../../assets/img/ic_right_swipe_red@2x.png";

import successImage from "../../../assets/img/ic_done_red@2x.png";
import styles from "./Style.module.css";
const SwipOutComponent = ({ leftSwipeDone, isLeftSwipDone }) => {
  return (
    <div>
      <SwipeButton
        mainText="SWIPE LEFT TO PUNCH OUT"
        overlayText=""
        classList={isLeftSwipDone !== "Done" ?styles.swipLeftBtn : styles.swipLeftBtnDone}
        overlayClassList={styles.cartList}
        onSwipeDone={() => {
          leftSwipeDone();
        }}
        minSwipeWidth="0.7"
        minSwipeVelocity="0.5"
        caretClassList={styles.caretLeft}
        caret={
          isLeftSwipDone === "Done" ? (
            <img src={successImage}    className={styles.swipeImg} alt=""/>
          ) : (
          <img src={rightSwip} className={styles.swipeImg} alt=""/>
          )
        }
       
      />
    </div>
  );
};

export default SwipOutComponent;
