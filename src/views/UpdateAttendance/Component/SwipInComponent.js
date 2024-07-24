import React, { useCallback, useEffect, useState } from "react";
import SwipeButton from "react-swipezor";
import rightSwip from "../../../assets/img/ic_right_swipe.png";
import successImage from "../../../assets/img/ic_punch_out_success@2x.png";
import successPunchIn from "../../../assets/img/ic_punch_in_success@2x.png";
import styles from "./Style.module.css";
const SwipInComponent = ({ swipeDone, isRightSwipDone }) => {
 

  return (
    <div >
      <SwipeButton
        mainText="SWIPE RIGHT TO PUNCH IN"
        overlayText=""
        onSwipeDone={() => {
          swipeDone();
        }}
      
        classList={styles.swipBtn}
       
         caretClassList={styles.cartList}
        caret={
          isRightSwipDone === "Done" ? (
            <img src={successPunchIn} className={styles.punchIn} />
          ) : (
            <img src={rightSwip} />
          )
        }
        // reset={reset}
      />
    </div>
  );
};

export default SwipInComponent;
