import React from "react";
import SwipeButton from "react-swipezor";
import rightSwip from "../../../assets/img/ic_right_swipe_green@2x.png";
import successImage from "../../../assets/img/ic_done_green@2x.png";

import styles from "./Style.module.css";
const SwipInComponent = ({ swipeDone, isRightSwipDone, isDoneSwipeRight }) => {



  return (
    <div>
      <SwipeButton
        mainText="SWIPE RIGHT TO PUNCH IN"
        overlayText=""
        onSwipeDone={() => {
          swipeDone();
        }}
       
        minSwipeWidth="0.7"
        minSwipeVelocity="0.5"
        classList={isRightSwipDone !== "Done" ? styles.swipBtn : styles.isClickCaret}
        caretClassList={styles.cartList}
        caret={
          isRightSwipDone !== "Done" ? (
            <img src={rightSwip} className={styles.swipeImg} alt="" />
          ) : (
            <img src={successImage} className={styles.swipeImg} alt=""   />
          )
        }
        // reset={isRightSwipDone === "Done"}
      />
    </div>
  );
};

export default SwipInComponent;
