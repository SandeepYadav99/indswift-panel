import styles from "./Style.module.css";
import React from "react";
import useSuccessionPlanner_hook from "./SuccessionPlanner_hook";
import ThisYearSuccessionPlanner from "./component/ThisYearSuccessionPlanner/ThisYearSuccessionPlanner";
import NextYearSuccessionPlanner from "./component/NextYearSuccessionPlanner/NextYearSuccessionPlanner";
import NextToNextYearSuccessionPlanner from "./component/NextToNextYearSuccessionPlanner/NextToNextYearSuccessionPlanner";
import { useSelector } from "react-redux";

const SuccessionPlannerList = ({ jobId }) => {
  const { listData } = useSuccessionPlanner_hook({
    jobId,
  });

  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span>
              <b>Within This Year Succession Planner</b>
            </span>
            <div className={styles.newLine2} />
          </div>
        </div>

        <ThisYearSuccessionPlanner listData={listData}/>
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
        <NextYearSuccessionPlanner listData={listData}/>
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
        <NextToNextYearSuccessionPlanner listData={listData}/>
      </div>
    </div>
  );
};

export default SuccessionPlannerList;
