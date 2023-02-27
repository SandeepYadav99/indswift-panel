import React, { useEffect, useState } from "react";
import styles from "./Style.module.css";
import GenricSlider from "../Members/GenricSlider";
import { useSelector } from "react-redux";
import { WaitingComponent } from "../../../../../components/index.component";

function EngagementEvents() {
  const { isTilesCalling, tiles } = useSelector(
    (state) => state.employeeDashboard
  );
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log("isMobile", isMobile);
  return (
    <div className={styles.engagementContainer}>
      <div>
        <span className={styles.title}>Employee Engagement Events</span>
        <div className={styles.newLine} />
      </div>
      {/* <div className={styles.engagementImageContainer}></div> */}
      <div className={styles.sliderBlock}>
        {isTilesCalling ? (
          <WaitingComponent />
        ) : (
          <GenricSlider sliderSettings={{ slidesToShow: isMobile ? 2 : 3 }}>
            {tiles?.utsavImages.map((item,index) => {
              return (
                <div className={styles.imgWrapper} key={`Engagement_${index}`}>
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
