import React, { useCallback } from "react";
import styles from "./Style.module.css";
import RouteName from "../../../../../../routes/Route.name";
import { ButtonBase } from "@material-ui/core";
import { Telegram } from "@material-ui/icons";
import historyUtils from "../../../../../../libs/history.utils";

const CandidateUploadCard = ({ data, handleSubmit, handleResendEafClick }) => {
  const checkStatus = () => {
    const arr = [
      "ACTIVE",
      "INTERVIEW_ALIGNED",
      "CV_REJECTED",
      "PENDING_SHORTLIST",
      "PENDING",
      "CV_SHORTLISTED",
      "NOT_JOINING",
      "DROPPED",
      "PENDING_REVIEW",
    ];
    if (arr.includes(data?.status)) {
      return false;
    }
    return true;
  };
  const olrPages = useCallback((data) => {
    historyUtils.push(`${RouteName.CANDIDATES_OFFER_DETAILS}${data?.offer_id}`);
  }, []);
  const eafPages = useCallback((data) => {
    historyUtils.push(`${RouteName.CANDIDATES_INFO}${data?.id}`);
  }, []);

  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Candidate Documents</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <a
                  className={styles.uploadTag}
                  target="_blank"
                  href={data?.resume}
                >
                  Resume
                </a>
              </div>
              {data?.offer_id && (
                <div className={styles.key}>
                  <div
                    className={styles.uploadTag}
                    onClick={()=>olrPages(data)}
                  >
                    OLR Sheet
                  </div>
                </div>
              )}
              {data?.is_eaf && (
                <div className={styles.key}>
                  <div
                    className={styles.uploadTag}
                    onClick={()=>eafPages(data)}
                  >
                    EAF Form
                  </div>
                </div>
              )}
              {data?.offer_letter_path && (
                <div className={styles.key}>
                  <a
                    className={styles.uploadTag}
                    target="_blank"
                    href={data?.offer_letter_path}
                  >
                    Offer Letter
                  </a>
                </div>
              )}
            </div>
            <div className={styles.right}>
            {checkStatus() && (

                <ButtonBase
                  className={styles.iconWrapper}
                  onClick={() => {
                    handleSubmit && handleSubmit();
                  }}
                >
                  <Telegram style={{ color: "#2896E9" }} />
                  <span className={styles.sendReminder}>Send IRF Form</span>
                </ButtonBase>
            )}
              <ButtonBase
                  className={styles.iconWrapper}
                  onClick={() => {
                   handleResendEafClick && handleResendEafClick()
                  }}
              >
                <Telegram style={{ color: "#2896E9" }} />
                <span className={styles.sendReminder}>Send EAF Form</span>
              </ButtonBase>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateUploadCard;
