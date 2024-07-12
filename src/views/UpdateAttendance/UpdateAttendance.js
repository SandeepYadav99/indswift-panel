import React, { useCallback, useState } from "react";

import styles from "./Style.module.css";
import AttendanceTime from "./Component/AttendanceTime";
import AttendaceText from "./Component/AttendaceText";
import SwipButton from "./Component/SwipButton";
import PunchInOutBox from "./Component/PunchInOutBox";
const UpdateAttendance = () => {
  const [isSwip, setIsSwip] = useState(false);
  const [isLeftSwip, setIsLeftSwip] = useState(false);
  const [punchTime, setPunchTime] = useState("10:00 AM");
  const [punchOutTime, setPunchOutTime] = useState("07:00 PM");
  const [punchDate, setPunchDate] = useState("05/07/2024 | Friday");

  const swipRightPunch = useCallback(() => {
    setIsSwip(true);
  }, [isSwip]);

  const swipLeftPunch = useCallback(() => {
    setIsLeftSwip(true);
  }, [isLeftSwip]);

  return (
    <div className={styles.container}>
      <div className={styles.boxShadow}>
        <div className={styles.subContainer}>
          <AttendanceTime punchTime={punchTime}  punchOutTime={punchOutTime}    isSwip={isSwip}
            isLeftSwip={isLeftSwip} punchDate={punchDate} />

          <AttendaceText />

          <SwipButton
            isSwip={isSwip}
            isLeftSwip={isLeftSwip}
            swipRightPunch={swipRightPunch}
            swipLeftPunch={swipLeftPunch}
          />

          <PunchInOutBox
            isSwip={isSwip}
            isLeftSwip={isLeftSwip}
            punchTime={punchTime}
            punchOutTime={punchOutTime}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateAttendance;
