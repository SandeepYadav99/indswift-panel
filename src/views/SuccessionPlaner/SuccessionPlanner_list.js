import styles from "./Style.module.css";
import React from "react";
import useSuccessionPlanner_hook from "./SuccessionPlanner_hook";
import ThisYearSuccessionPlanner from "./component/ThisYearSuccessionPlanner/ThisYearSuccessionPlanner";
import NextYearSuccessionPlanner from "./component/NextYearSuccessionPlanner/NextYearSuccessionPlanner";
import NextToNextYearSuccessionPlanner from "./component/NextToNextYearSuccessionPlanner/NextToNextYearSuccessionPlanner";


const SuccessionPlannerList = ({ jobId }) => {
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
              <b>This Year Succession Planner</b>
            </span>
            <div className={styles.newLine2} />
          </div>

          
        </div>
        {/* <ImprestUpperTable /> */}
        <ThisYearSuccessionPlanner/>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span>
              <b>Next Year Succession Planner</b>
            </span>
            <div className={styles.newLine2} />
          </div>

          
        </div>
        <NextYearSuccessionPlanner/>
        {/* <OtherTable jobId={user_id} Claimtype="OTHER" /> */}
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span>
              <b>Next to Next Year Succession Planner</b>
            </span>
            <div className={styles.newLine2} />
          </div>
       
        </div>
        {/* <TravelTable jobId={user_id} Claimtype="TRAVEL" /> */}
        <NextToNextYearSuccessionPlanner/>
      </div>
    </div>
  );
};

export default SuccessionPlannerList;
