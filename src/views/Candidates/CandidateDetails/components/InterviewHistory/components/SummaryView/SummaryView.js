import React from "react";
import StatusPill from "../../../../../../../components/Status/StatusPill.component";
import styles from "./Style.module.css";
import DefaultImg from "../../../../../../../assets/img/download.png";
import star from "../../../../../../../assets/img/star.png";
function SummaryView({ title, statustitle, status, profile }) {
  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.mappedCardContainer}>
        {profile?.length &&
          profile?.map((item,index) => (
            <div className={styles.mappedCard} key={`SummaryView_${index}`}>
              <div className={styles.imageNameContainer}>
                <div className={styles.imageContainer}>
                  <img
                    src={
                      item?.employee?.image ? item?.employee?.image : DefaultImg
                    }
                  />
                </div>
                <div className={styles.nameContainer}>
                  <span>{item?.employee?.name}</span>
                  <div className={styles.date}>{item?.createdAtText}</div>
                </div>
              </div>
              <div className={styles.SummaryViewstar}>
                <div className={styles.buttonWrapper}>
                  <StatusPill status={item?.interview_status} />
                </div>
                <div className={styles.starWrapper}>
                  <img className={styles.starimg} src={star} />
                  <span>{item?.rating ? item?.rating : "-"}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.statusWrapper}>
        <div className={styles.statusColor}>
          <span className={styles.date}>{statustitle} </span>
          <span
            className={
              status === "REJECTED"
                ? styles.coloredStatusRed
                : status === "PENDING"
                ? styles.coloredStatusPending
                : styles.coloredStatus
            }
          >
            {status}
          </span>
        </div>
        <div>
          {/* <span className={styles.date}>02/12/2022 | 03:40 PM</span> */}
        </div>
      </div>
    </div>
  );
}

export default SummaryView;
