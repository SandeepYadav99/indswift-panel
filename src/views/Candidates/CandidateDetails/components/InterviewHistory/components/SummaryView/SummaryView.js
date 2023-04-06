import React from "react";
import StatusPill from "../../../../../../../components/Status/StatusPill.component";
import styles from "./Style.module.css";
import DefaultImg from "../../../../../../../assets/img/download.png";
import star from "../../../../../../../assets/img/star.png";
import historyUtils from "../../../../../../../libs/history.utils";
import { useCallback } from "react";
import RouteName from "../../../../../../../routes/Route.name";
import { Telegram } from "@material-ui/icons";
function SummaryView({
  title,
  statustitle,
  status,
  InterviewList,
  rating,
  cvList,
  date,
  // handleSendReminder
}) {
  const ChangeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "NA";
  };
  const feedbackDetailPage = useCallback((data) => {
    historyUtils.push(RouteName.CANDIDATE_FEEDBACK_VIEW + data?.feedback_id);
  }, []);
  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.mappedCardContainer}>
        {InterviewList?.length ? (
          InterviewList?.map((item, index) => (
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
                  { item?.interview_status &&
                    item?.interview_status !== "PENDING" && (
                      <span
                        className={styles.hyperlinkText}
                        onClick={() => feedbackDetailPage(item)}
                      >
                        View feedback
                      </span>
                    )}
                </div>
              </div>
              <div className={styles.SummaryViewstar}>
                <div className={styles.buttonWrapper}>
                  <StatusPill status={item?.interview_status} />
                </div>
                <div className={styles.starWrapper}>
                  <img className={styles.starimg} src={star} />
                  <span>
                    {item?.rating ? Math.floor(item?.rating * 10) / 10 : "-"}
                  </span>
                  {/* <span>{item?.rating ? item?.rating.toFixed(1) : "-"}</span> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
        {cvList?.length ? (
          cvList?.map((item, index) => (
            <div className={styles.mappedCard} key={`SummaryViewCV_${index}`}>
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
                  <div className={styles.date}>{item?.updatedAtText}</div>
                </div>
              </div>
              <div className={styles.SummaryViewstar}>
                <div className={styles.buttonWrapper}>
                  <StatusPill status={item?.status} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
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
            {ChangeUnderScore(status)}
          </span>
          {rating && (
            <div className={styles.starWrapper}>
              <img className={styles.starimg} src={star} />
              <span>{rating ? Math.floor(rating * 10) / 10 : "-"}</span>
            </div>
          )}
        </div>
        <div>
          {status !== "PENDING" ? (
            <span className={styles.date}>{date}</span>
          ) : (
            <div
              className={styles.iconWrapper}
              //  onClick={handleSendReminder}
            >
              <Telegram style={{ color: "#2896E9" }} />
              <span className={styles.sendReminder}>Send Reminder</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryView;
