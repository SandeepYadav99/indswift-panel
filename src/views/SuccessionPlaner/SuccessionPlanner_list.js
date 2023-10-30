import styles from "./Style.module.css";
import React from "react";
import useSuccessionPlanner_hook from "./SuccessionPlanner_hook";


const SuccessionPlanner_list = ({ jobId }) => {
  const { handleAddCandidate, candidateEl, handleCreate, typeData, user_id ,handleCsvDownload} =
  useSuccessionPlanner_hook({
      jobId,
    });
  return (
    <div>
      <div className={styles.plainPaper}>
      <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span>
              <b>Non Travel Imprest Ledger</b>
            </span>
            <div className={styles.newLine2} />
          </div>

          
        </div>
        {/* <ImprestUpperTable /> */}
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span>
              <b>Non Travel Imprest Ledger</b>
            </span>
            <div className={styles.newLine2} />
          </div>

          
        </div>
        {/* <OtherTable jobId={user_id} Claimtype="OTHER" /> */}
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span>
              <b>Travel Imprest Ledger</b>
            </span>
            <div className={styles.newLine2} />
          </div>
       
        </div>
        {/* <TravelTable jobId={user_id} Claimtype="TRAVEL" /> */}
      </div>
    </div>
  );
};

export default SuccessionPlanner_list;
