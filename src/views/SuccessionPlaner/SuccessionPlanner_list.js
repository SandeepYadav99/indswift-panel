import styles from "./Style.module.css";
import React from "react";
import useSuccessionPlanner_hook from "./SuccessionPlanner_hook";
import ThisYearSuccessionPlanner from "./component/ThisYearSuccessionPlanner/ThisYearSuccessionPlanner";
import NextYearSuccessionPlanner from "./component/NextYearSuccessionPlanner/NextYearSuccessionPlanner";
import NextToNextYearSuccessionPlanner from "./component/NextToNextYearSuccessionPlanner/NextToNextYearSuccessionPlanner";
import { useSelector } from "react-redux";

const SuccessionPlannerList = ({ jobId }) => {
  const {
    handleAddCandidate,
    candidateEl,
    handleCreate,
    typeData,
    user_id,
    handleCsvDownload,
  } = useSuccessionPlanner_hook({
    jobId,
  });

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
    source,
  } = useSelector((state) => state.successionPlaner);
console.log(data, source)
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

        <ThisYearSuccessionPlanner
          data={data}
          all={allData}
          currentPage={currentPage}
          isFetching={isFetching}
          source={source}
        />
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
        <NextYearSuccessionPlanner
          data={data}
          all={allData}
          currentPage={currentPage}
          isFetching={isFetching}
          source={source}
        />
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
        <NextToNextYearSuccessionPlanner
          data={data}
          all={allData}
          currentPage={currentPage}
          isFetching={isFetching}
          source="next_next_year"
        />
      </div>
    </div>
  );
};

export default SuccessionPlannerList;
