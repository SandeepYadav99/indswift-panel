import React from "react";
import styles from "./Style.module.css";
const PunchInOutBox = () => {
  return (
    <div className={styles.punchInOutContainer}>
      <div className={styles.punchInOutSubContainer}>
        <div className={styles.itemFlex}>
          <img src="" alt="" />
          <div>
            <div>__</div>
            <div>Punch In</div>
          </div>
        </div>
        <div className={styles.itemFlex}>
          <img src="" alt="" />
          <div>
            <div>__</div>
            <div>Punch Out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunchInOutBox;
