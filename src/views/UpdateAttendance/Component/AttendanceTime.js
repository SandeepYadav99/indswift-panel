import React from "react";
import styles from "./Style.module.css";
const AttendanceTime = ({
  punchTime,
  punchDate,
 
  punchOutTime,
  isLeftSwipDone,
  isRightSwipDone,
}) => {
  return (
    <div className={styles.timeContainer}>
      <div className={styles.timePicker}>
        {isRightSwipDone === "Done" ? punchOutTime : punchTime}
      </div>
      <div className={styles.datePick}>{punchDate}</div>
    </div>
  );
};

export default AttendanceTime;
