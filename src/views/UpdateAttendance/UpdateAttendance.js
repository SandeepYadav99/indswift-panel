import React from "react";
import PageBoxComponent from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import AttendanceTime from "./Component/AttendanceTime";
import AttendaceText from "./Component/AttendaceText";
import SwipButton from "./Component/SwipButton";
import PunchInOutBox from "./Component/PunchInOutBox";
const UpdateAttendance = () => {
  return (
    <div className={styles.container}>
      <PageBoxComponent>
        <div className={styles.subContainer}>
          <div>
            <AttendanceTime />
          </div>
          <div>
            <AttendaceText />
          </div>
          <div>
            <SwipButton />
          </div>
          <div>
            <PunchInOutBox />
          </div>
        </div>
      </PageBoxComponent>
    </div>
  );
};

export default UpdateAttendance;
