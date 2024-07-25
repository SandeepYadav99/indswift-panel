import React  from "react";
import styles from "./Style.module.css";
import SwipInComponent from "./SwipInComponent";
import SwipOutComponent from "./SwiptOutComponent";

const SwipButton = ({ swipeDone, isRightSwipDone , leftSwipeDone, isLeftSwipDone, isDone}) => {
 
  

  return (
    <div className={styles.buttonContainer}>
      {isDone === false ? (
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

export default React.memo(SwipButton);
