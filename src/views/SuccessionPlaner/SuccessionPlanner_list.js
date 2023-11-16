import styles from "./Style.module.css";
import React from "react";
import useSuccessionPlanner_hook from "./SuccessionPlanner_hook";
import ThisYearSuccessionPlanner from "./component/ThisYearSuccessionPlanner/ThisYearSuccessionPlanner";
import NextYearSuccessionPlanner from "./component/NextYearSuccessionPlanner/NextYearSuccessionPlanner";
import NextToNextYearSuccessionPlanner from "./component/NextToNextYearSuccessionPlanner/NextToNextYearSuccessionPlanner";
import { useSelector } from "react-redux";

const SuccessionPlannerList = ({ jobId }) => {
  const { candidateEl, handleCreate, typeData, user_id, handleCsvDownload } =
    useSuccessionPlanner_hook({
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

        <ThisYearSuccessionPlanner />
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
        {/* <NextYearSuccessionPlanner
          // data={nextYear}
          // all={allNextYearData}
          // currentPage={currentPage}
          // isFetching={isFetching}
        /> */}
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
        {/* <NextToNextYearSuccessionPlanner
          // data={allNextNextYear}
          // all={allNextNextYearData}
          // currentPage={currentPage}
          // isFetching={isFetching}
        /> */}
      </div>
    </div>
  );
};

export default SuccessionPlannerList;
