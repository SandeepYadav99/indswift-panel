import React from "react";
import styles from "./Style.module.css";
import GenricSlider from "../Members/GenricSlider";
import { useSelector } from "react-redux";
import {WaitingComponent} from "../../../../../components/index.component";

function EngagementEvents() {
  const { isTilesCalling, tiles } = useSelector(
    (state) => state.employeeDashboard
  );

  return (
    <div className={styles.engagementContainer}>
      <div>
        <span className={styles.title}>Employee Engagement Events</span>
        <div className={styles.newLine} />
      </div>
      <div className={styles.engagementImageContainer}></div>
      <div className={styles.sliderBlock}>
        {isTilesCalling ? (
          <WaitingComponent />
        ) : (
          <GenricSlider>
            {tiles?.utsavImages.map((item) => {
              return (
                <div>
                  <img className={styles.img} src={item?.image} />
                </div>
              );
            })}
          </GenricSlider>
        )}
      </div>
    </div>
  );
}

export default EngagementEvents;
