import React from "react";
import styles from "./Style.module.css";
const AttendanceTime = ({ punchTime, punchDate, isSwip, isLeftSwip, punchOutTime }) => {
  return (
    <div className={styles.timeContainer}>
      <div className={styles.timePicker}>{isLeftSwip ? punchOutTime : punchTime}</div>
      <div className={styles.datePick}>{punchDate}</div>
    </div>
  );
};

export default AttendanceTime;
