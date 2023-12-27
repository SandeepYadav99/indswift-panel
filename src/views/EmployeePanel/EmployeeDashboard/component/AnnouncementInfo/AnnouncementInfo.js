import React, { useCallback } from "react";
import styles from "./Style.module.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useSelector } from "react-redux";
import { useState } from "react";

function AnnouncementInfo() {
  const [showImage, setShowImage] = useState(0);
  const handleMouseOver = (x) => {
    setShowImage(x);
  };

  const { announcements } = useSelector(
    (state) => state.employeeDashboard.tiles
  );
  const selectedImage = useCallback(() => {
    if (announcements?.length > 0) {
      return announcements ? announcements[showImage]?.image : "";
    }
  }, [showImage, announcements]);

  return (
    <div className={styles.AnnouncementInfoWrapper}>
      {announcements?.length > 0 && (
        <div className={styles.imageWrapper}>
          <img
            src={
              selectedImage()
                ? selectedImage()
                : require("../../../../../assets/img/cert.png")
            }
            className={styles.componentData}
          />
        </div>
      )}

      <div className={styles.announcementDes}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>Latest Announcements</span>
          <div className={styles.newLine} />
        </div>
        {announcements?.length > 0 &&
          announcements?.map((item, index) => (
            <>
              <a href={item?.link} target="_blank">
                <div
                  className={styles.description}
                  key={`announcement_${index}`}
                  onMouseOver={() => handleMouseOver(index)}
                >
                  <p>{item?.title}</p>
                  <KeyboardArrowRightIcon />
                </div>
              </a>
              {index !== 2 && <div className={styles.verticalLine}></div>}
            </>
          ))}
      </div>
    </div>
  );
}

export default AnnouncementInfo;
