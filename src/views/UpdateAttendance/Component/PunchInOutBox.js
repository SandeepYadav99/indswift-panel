import React from "react";
import styles from "./Style.module.css";
import punchIn from "../../../assets/img/ic_punch_in.png";
import punchOut from "../../../assets/img/ic_punch_out.png"


const PunchInOutBox = () => {
  return (
    <div className={styles.punchInOutContainer}>
      <div className={styles.punchInOutSubContainer}>
        <div className={styles.itemFlex}>
          <img src={punchIn} alt="" />
          <div>
            <div>10:00 AM</div>
            <div>Punch In</div>
          </div>
        </div>
        <div className={styles.itemFlex}>
        <img src={punchOut} alt="" />
          <div>
            <div>07:00 PM</div>
            <div>Punch Out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunchInOutBox;
