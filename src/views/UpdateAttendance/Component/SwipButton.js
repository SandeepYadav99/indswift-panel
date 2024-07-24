import React, { useCallback, useMemo, useState } from "react";
import styles from "./Style.module.css";
import SwipInComponent from "./SwipInComponent";
import SwipOutComponent from "./SwiptOutComponent";

const SwipButton = ({ swipeDone, isRightSwipDone , leftSwipeDone, isLeftSwipDone}) => {
 

  return (
    <div className={styles.buttonContainer}>
      {isRightSwipDone !== "Done" ? (
        <SwipInComponent
          swipeDone={swipeDone}
          isRightSwipDone={isRightSwipDone}
        />
      ) : (
        <SwipOutComponent leftSwipeDone={leftSwipeDone} isLeftSwipDone={isLeftSwipDone}/>
      )}
    </div>
  );
};

export default SwipButton;
