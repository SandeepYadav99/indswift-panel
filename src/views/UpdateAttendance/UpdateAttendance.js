import React, { useCallback, useState } from "react";

import styles from "./Style.module.css";
import AttendanceTime from "./Component/AttendanceTime";
import AttendaceText from "./Component/AttendaceText";
import SwipButton from "./Component/SwipButton";
import PunchInOutBox from "./Component/PunchInOutBox";
const UpdateAttendance = () => {

  const [punchTime, setPunchTime] = useState("10:00 AM");
  const [punchOutTime, setPunchOutTime] = useState("07:00 PM");
  const [punchDate, setPunchDate] = useState("05/07/2024 | Friday");
  const [isRightSwipDone, setIsRightSwipDone] = useState("");
  const [isLeftSwipDone, setIsLeftSwipDone] = useState("");
  const [isDone, setIsDone] = useState(false);

  const leftSwipeDone = () => {
    setIsLeftSwipDone("Done");
  };
  const handleIsDone = useCallback(() => {
    setTimeout(() => setIsDone(true), 500);
  }, [isRightSwipDone]);
  
  const swipeDone = useCallback(() => {
    setIsRightSwipDone("Done");
    handleIsDone();
  }, [isRightSwipDone, handleIsDone]);

  return (
    <div className={styles.container}>
      <div className={styles.boxShadow}>
        <div className={styles.subContainer}>
          <AttendanceTime
            punchTime={punchTime}
            punchOutTime={punchOutTime}
            leftSwipeDone={leftSwipeDone}
            isRightSwipDone={isRightSwipDone}
            punchDate={punchDate}
            isLeftSwipDone={isLeftSwipDone}
          />

          <AttendaceText />

          <SwipButton
            isDone={isDone}
            leftSwipeDone={leftSwipeDone}
            isRightSwipDone={isRightSwipDone}
            isLeftSwipDone={isLeftSwipDone}
            swipeDone={swipeDone}
          />

          <PunchInOutBox
            isLeftSwipDone={isLeftSwipDone}
            isRightSwipDone={isRightSwipDone}
            punchTime={punchTime}
            punchOutTime={punchOutTime}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateAttendance;
