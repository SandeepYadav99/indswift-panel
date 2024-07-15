import React from "react";
import styles from "./Style.module.css";
const AttendaceText = () => {
  return (
    <div className={styles.textContainer}>
      <div>
        <div className={styles.textAttendance}>Attendance</div>
        <div className={styles.newLine} />
      </div>
      <div className={styles.subText}>Swipe to Punch in/Punch out</div>
    </div>
  );
};

export default AttendaceText;
