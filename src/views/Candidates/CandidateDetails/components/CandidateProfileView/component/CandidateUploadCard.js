import React from "react";
import styles from "./Style.module.css";
import RouteName from "../../../../../../routes/Route.name";
import { ButtonBase } from "@material-ui/core";
import { Telegram } from "@material-ui/icons";

const CandidateUploadCard = ({ data, handleSubmit }) => {
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
    ];
    if (arr.includes(data?.status)) {
      return false;
    }
    return true;
  };
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
                  <a
                    className={styles.uploadTag}
                    href={`${RouteName.CANDIDATES_OFFER_DETAILS}${data?.offer_id}`}
                  >
                    OLR Sheet
                  </a>
                </div>
              )}
              {data?.is_eaf && (
                <div className={styles.key}>
                  <a
                    className={styles.uploadTag}
                    href={`${RouteName.CANDIDATES_INFO}${data?.enc_id}`}
                  >
                    EAF Form
                  </a>
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
            {checkStatus() && (
              <div className={styles.right}>
                <ButtonBase
                  className={styles.iconWrapper}
                  onClick={() => {
                    handleSubmit && handleSubmit();
                  }}
                >
                  <Telegram style={{ color: "#2896E9" }} />
                  <span className={styles.sendReminder}>Send IRF Form</span>
                </ButtonBase>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateUploadCard;
