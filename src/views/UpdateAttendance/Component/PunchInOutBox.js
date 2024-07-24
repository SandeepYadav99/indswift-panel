import React from "react";
import styles from "./Style.module.css";
import punchIn from "../../../assets/img/ic_punch_in.png";
import punchOut from "../../../assets/img/ic_punch_out.png";

const PunchInOutBox = ({ isSwip, punchTime, punchOutTime, isLeftSwip, isRightSwipDone, isLeftSwipDone }) => {

  return (
    <div className={styles.punchInOutContainer}>
      <div className={styles.punchInOutSubContainer}>
        <div className={styles.itemFlex}>
          <img src={punchIn} alt="" className={styles.punchImage} />
          <div className={styles.subBoxContainer}>
            <div className={styles.punchTime}>{isRightSwipDone === "Done" ? punchTime : "-"}</div>
            <div
              className={
                isRightSwipDone === "Done"
                  ? styles.punchTimeTextPunchIn
                  : styles.punchTimeText
              }
            >
              Punch In
            </div>
          </div>
        </div>
        <div className={styles.itemFlex}>
          <img src={punchOut} alt="" className={styles.punchImage} />
          <div className={styles.subBoxContainer}>
            <div className={styles.punchTime}>
              {isLeftSwipDone === "Done" ? punchOutTime : "-"}
            </div>
            <div
              className={
                isLeftSwipDone === "Done" ? styles.punchTimeTextPunchIn : styles.punchTimeText
              }
            >
              Punch Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunchInOutBox;
