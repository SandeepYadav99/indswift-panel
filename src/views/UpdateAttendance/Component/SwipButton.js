import React,{useState} from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import rightSwip from "../../../assets/img/ic_right_swipe.png";
import leftSwip from "../../../assets/img/ic_left_swipe.png";
import successImage from "../../../assets/img/ic_punch_out_success@2x.png"
import { useSwipeable } from "react-swipeable";

const CustomSwipeableButton = ({ onSuccess, text, text_unlocked, color }) => {
  const [swiped, setSwiped] = useState(false);
  const [translateX, setTranslateX] = useState(0); 

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
     
    },
    onSwiped: () => {
      if (!swiped) {
        setTranslateX(0); // Reset if not fully swiped
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div
      {...handlers}
      className={styles.swipeableButton}
      style={{ backgroundColor: color }}
    >
      {!swiped && (
        <div
          className={styles.swipeImageContainer}
          style={{
            transform: `translateX(${translateX}%)`,
            transition: swiped ? 'transform 0.3s ease-out' : 'none'
          }}
        >
          <img
            src={rightSwip}
            alt="Swipe Icon"
            className={styles.swipeImage}
          />
        </div>
      )}
      <span>{swiped ? text_unlocked : text}</span>
      {swiped && (
        <img
          src={successImage}
          alt="Success Icon"
          className={styles.successImage}
        />
      )}
    </div>
  );
};


const SwipButton = ({ swipRightPunch, swipLeftPunch, isSwip, isLeftSwip }) => {
  console.log(isSwip);
  const onSuccess = () => {
    console.log("Successfully Swiped!");
  };
  return (
    <div className={styles.buttonContainer}>
      {!isSwip || isLeftSwip ? (
        <ButtonBase className={styles.swipBtn} onClick={swipRightPunch}>
          SWIPE RIGHT TO PUNCH IN <img src={rightSwip} alt="" className={styles.swipImage} />
        </ButtonBase>
        // <div className={styles.swipBtn} >
        // <CustomSwipeableButton
        //   onSuccess={onSuccess}
        //   text="Swipe me!"
        //   text_unlocked="yeee"
        //   color="#16362d"
        // />
      // </div>
       
      ) : (
        <ButtonBase className={styles.swipLeftBtn} onClick={swipLeftPunch}>
          SWIPE LEFT TO PUNCH OUT <img src={leftSwip} alt="" className={styles.swipImage}/>
        </ButtonBase>
      )}
    </div>
  );
};

export default SwipButton;
