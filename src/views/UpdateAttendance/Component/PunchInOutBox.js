import React from "react";
import styles from "./Style.module.css";
import punchIn from "../../../assets/img/ic_punch_in.png";
import punchOut from "../../../assets/img/ic_punch_out.png";

const PunchInOutBox = ({ isSwip, punchTime, punchOutTime, isLeftSwip }) => {
  return (
    <div className={styles.punchInOutContainer}>
      <div className={styles.punchInOutSubContainer}>
        <div className={styles.itemFlex}>
          <img src={punchIn} alt="" className={styles.punchImage} />
          <div className={styles.subBoxContainer}>
            <div className={styles.punchTime}>{isSwip ? punchTime : "__"}</div>
            <div
              className={
                isSwip === "true"
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
              {isLeftSwip ? punchOutTime : "__"}
            </div>
            <div
              className={
                isLeftSwip === "true"
                  ? styles.punchTimeTextPunchIn
                  : styles.punchTimeText
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
