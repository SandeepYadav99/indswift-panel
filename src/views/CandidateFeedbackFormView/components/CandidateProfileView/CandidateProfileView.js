import React from "react";
import styles from "./Style.module.css";
import face from "./../../../../assets/img/download.png";
import StatusPill from "../../../../components/Status/StatusPill.component";
import star from "../../../../assets/img/star.png";

const CandidateProfileView = ( {data} ) => {
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
              <img className={styles.candidateImg} src={data?.candidate_info?.image ? data?.candidate_info?.image :face} />
            </div>
            <div className={styles.desWrapper}>
              <span>
                <strong>{data?.candidate_info?.name}</strong>
              </span>
              <span>{data?.candidate_info?.designation}</span>
              <a href={data?.candidate_info?.resume} target={"_blank"} className={styles.resumeLink}>
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
                <img className={styles.candidateImg} src={data?.interviewer?.image ? data?.interviewer?.image :face} />
              </div>
              <div className={styles.desWrapper}>
                <span>
                  <strong>{data?.interviewer?.name}</strong>
                </span>
                <span>{data?.updatedAtText}</span>
                <div className={styles.starWrapper}>
                  <img className={styles.starimg} src={star} />
                  <span>
                    {data?.rating ? Math.floor(data?.rating * 10) / 10 : "-"}
                  </span>
                  {/* <span>{item?.rating ? item?.rating.toFixed(1) : "-"}</span> */}
                </div>
              </div>
            </div>
            <div>
                <StatusPill status={data?.interview_status}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateProfileView;
