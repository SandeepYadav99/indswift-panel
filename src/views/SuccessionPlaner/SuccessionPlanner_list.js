import styles from "./Style.module.css";
import React from "react";
import useSuccessionPlanner_hook from "./SuccessionPlanner_hook";
import ThisYearSuccessionPlanner from "./component/ThisYearSuccessionPlanner/ThisYearSuccessionPlanner";
import NextYearSuccessionPlanner from "./component/NextYearSuccessionPlanner/NextYearSuccessionPlanner";
import NextToNextYearSuccessionPlanner from "./component/NextToNextYearSuccessionPlanner/NextToNextYearSuccessionPlanner";
import RetireDialog from "./component/RetireDialog/RetireDialog.view";

const SuccessionPlannerList = ({ jobId }) => {
  const { listData ,retireDialog,toggleRetireDialog,empId} = useSuccessionPlanner_hook({
    jobId,
  });

  return (
    <div>
      <div className={styles.plainPaper}>
      <RetireDialog
          candidateId={empId}
          isOpen={retireDialog}
          handleToggle={toggleRetireDialog}
        />
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span>
              <b>Within This Year Succession Planner</b>
            </span>
            <div className={styles.newLine2} />
          </div>
        </div>

        <ThisYearSuccessionPlanner listData={listData} toggleRetireDialog={toggleRetireDialog}/>
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
        <NextYearSuccessionPlanner listData={listData} toggleRetireDialog={toggleRetireDialog}/>
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
        <NextToNextYearSuccessionPlanner listData={listData} toggleRetireDialog={toggleRetireDialog}/>
      </div>
    </div>
  );
};

export default SuccessionPlannerList;
