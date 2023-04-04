import React from "react";
import styles from "./Style.module.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AnnouncementInfo() {
  const { announcements } = useSelector(
    (state) => state.employeeDashboard.tiles
  );
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
        {announcements?.length > 0 &&
          announcements?.map((item, index) => (
            <Link to={item?.link} target='_blank'>
            <div className={styles.description} key={`announcement_${index}`}>
              <p>{item?.title}</p>
              <KeyboardArrowRightIcon />
            </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default AnnouncementInfo;
