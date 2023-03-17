import React from "react";
import styles from "./Style.module.css";
import face from "./../../../../assets/img/download.png";
import StatusPill from "../../../../components/Status/StatusPill.component";

const CandidateProfileView = ({ data }) => {
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/, " ") : "";
  };
  return (
    <>
      <div className={styles.candidateInfoWrapper}>
        <div className={styles.leftField}>
          <div className={styles.headingWrapper}>
            <span>Candidate Information</span>
          </div>
          <div className={styles.imageDesWrapper}>
            <div>
              <img className={styles.candidateImg} src={face} />
            </div>
            <div className={styles.desWrapper}>
              <span>
                <strong>AMAN DEEP SINGH</strong>
                {/* <strong>{data?.candidate?.name}</strong> */}
              </span>
              <a href={data?.candidate?.resume} target={"_blank"}>
                Candidate Resume Link
              </a>
            </div>
          </div>
        </div>
        <div className={styles.rightField}>
          <div className={styles.headingWrapper}>
            <span>Interviewer Information</span>
          </div>
          <div className={styles.imageDesWrapper2}>
            <div className={styles.leftWrapper}>
              <div>
                <img className={styles.candidateImg} src={face} />
              </div>
              <div className={styles.desWrapper}>
                <span>
                  <strong>AMAN DEEP SINGH</strong>
                  {/* <strong>{data?.candidate?.name}</strong> */}
                </span>
                <a href={data?.candidate?.resume} target={"_blank"}>
                  Candidate Resume Link
                </a>
              </div>
            </div>
            <div>
                <StatusPill status="ACTIVE"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateProfileView;
