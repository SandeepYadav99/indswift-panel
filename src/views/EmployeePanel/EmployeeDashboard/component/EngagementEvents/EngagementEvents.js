import React from "react";
import styles from "./Style.module.css";
import GenricSlider from "../Members/GenricSlider";

function EngagementEvents() {
  return (
    <div className={styles.engagementContainer}>
      <div>
        <span className={styles.title}>Employee Engagement Events</span>
        <div className={styles.newLine} />
      </div>
      <div className={styles.engagementImageContainer}>


      </div>
        <div className={styles.sliderBlock}>
            <GenricSlider>
               <div>
                   <img
                       className={styles.img}
                       src={require("../../../../../assets/img/ic_work in progress.png")}
                   />
               </div>
                <div>
                    <img
                        className={styles.img}
                        src={require("../../../../../assets/img/ic_work in progress.png")}
                    />
                </div>
                <div>
                    <img
                        className={styles.img}
                        src={require("../../../../../assets/img/ic_work in progress.png")}
                    />
                </div>
                <div>
                    <img
                        className={styles.img}
                        src={require("../../../../../assets/img/ic_work in progress.png")}
                    />
                </div>
            </GenricSlider>
        </div>
    </div>
  );
}

export default EngagementEvents;
