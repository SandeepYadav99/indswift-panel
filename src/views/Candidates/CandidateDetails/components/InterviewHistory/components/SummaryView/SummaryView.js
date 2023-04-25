import React, { useEffect, useState } from "react";
import StatusPill from "../../../../../../../components/Status/StatusPill.component";
import styles from "./Style.module.css";
import DefaultImg from "../../../../../../../assets/img/download.png";
import star from "../../../../../../../assets/img/star.png";
import historyUtils from "../../../../../../../libs/history.utils";
import { useCallback } from "react";
import RouteName from "../../../../../../../routes/Route.name";
import { Telegram } from "@material-ui/icons";
import { ButtonBase } from "@material-ui/core";
function SummaryView({
  title,
  statustitle,
  status,
  InterviewList,
  rating,
  cvList,
  date,
  offerList,
  handleSendReminder,
  isSubmitting,
}) {
  const [rememberFlag, setRememberFlag] = useState(false);
  const ChangeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "NA";
  };
  const feedbackDetailPage = useCallback((data) => {
    historyUtils.push(RouteName.CANDIDATE_FEEDBACK_VIEW + data?.feedback_id);
  }, []);
  useEffect(() => {
    if (InterviewList) {
      setRememberFlag(
        InterviewList?.some((item) => item?.interview_status === "PENDING")
      );
    }
    if (offerList) {
      setRememberFlag(offerList?.some((item) => item?.status === "PENDING"));
    }
    if (cvList) {
      setRememberFlag(cvList?.some((item) => item?.status === "PENDING"));
    }
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
                  {item?.interview_status &&
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
                  {/* {checkPending(item?.interview_status)} */}
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
        {offerList?.length ? (
          offerList?.map((item, index) => (
            <div className={styles.mappedCard} key={`OfferList_${index}`}>
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
                  {item?.interview_status &&
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
                  <StatusPill status={ChangeUnderScore(item?.status)} />
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
          <StatusPill
            style={{
              border: "none",
              minWidth: "0",
              padding: "0",
              fontSize: "0.875rem",
            }}
            status={ChangeUnderScore(status)}
          />
          {rating && (
            <div className={styles.starWrapper}>
              <img className={styles.starimg} src={star} />
              <span>{rating ? Math.floor(rating * 10) / 10 : "-"}</span>
            </div>
          )}
        </div>
        <div className={styles.rememberWrap}>
          {rememberFlag && (
            <ButtonBase
              disabled={isSubmitting}
              className={styles.iconWrapper}
              onClick={() => {
                handleSendReminder && handleSendReminder();
              }}
            >
              <Telegram style={{ color: "#2896E9" }} />
              <span className={styles.sendReminder}>Send Reminder</span>
            </ButtonBase>
          )}
          {status !== "PENDING" && (
            // {date !== "Invalid date" && (
            <span className={styles.date}>{date}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryView;
