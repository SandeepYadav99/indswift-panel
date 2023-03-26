import React from "react";
import styles from "./Style.module.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

function AnnouncementInfo() {
  return (
    <div className={styles.AnnouncementInfoWrapper}>
      <div className={styles.imageWrapper}>
      <img src={require("../../../../../assets/img/cert.png")} />
      </div>
      <div className={styles.announcementDes}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>Latest Announcements</span>
          <div className={styles.newLine} />
        </div>
        <div className={styles.description}>
          <p>
            Ind-Swift Laboratories has received Asia's Best Company of the year
            Awards 2022
          </p>
          <KeyboardArrowRightIcon />
        </div>
        <div className={styles.description}>
          <p>
            Ind-Swift Laboratories has received Asia's Best Company of the year
            Awards 2022
          </p>
          <KeyboardArrowRightIcon />
        </div>
        <div className={styles.description}>
          <p>
            Ind-Swift Laboratories has received Asia's Best Company of the year
            Awards 2022
          </p>
          <KeyboardArrowRightIcon />
        </div>
      </div>
    </div>
  );
}

export default AnnouncementInfo;
