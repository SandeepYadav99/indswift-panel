import React from "react";
import styles from "./Style.module.css";
import SummaryView from "./components/SummaryView/SummaryView";
import EventDetails from "./components/EventDetails/EventDetails";
import StatusPill from "../../../../../components/Status/StatusPill.component";
function InterviewHistory() {
  return (
    <div className={styles.interviewWrapper}>
      <div className={styles.titleWrapper}>
        <div>
          <div className={styles.title}> Summary</div>
          <div className={styles.newLine} />
        </div>
        <div>
          <StatusPill status="Active" />
        </div>
      </div>
      <SummaryView />
      {/* <EventDetails /> */}
    </div>
  );
}

export default InterviewHistory;
