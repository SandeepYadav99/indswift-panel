import React from "react";
import styles from "./Style.module.css";
import RouteName from "../../../../../../routes/Route.name";

const CandidateUploadCard = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Candidate Uploads</div>

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
              {
                data?.is_eaf && <div className={styles.key}>
                <a className={styles.uploadTag}  href={`${RouteName.CANDIDATES_INFO}${data?.enc_id}`}>
                  EAF Form
                </a>
              </div>
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateUploadCard;
