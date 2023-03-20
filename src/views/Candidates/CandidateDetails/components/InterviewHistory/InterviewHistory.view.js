import React from "react";
import styles from "./Style.module.css";
import SummaryView from "./components/SummaryView/SummaryView";
import EventDetails from "./components/EventDetails/EventDetails";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import { Link } from "react-router-dom";
function InterviewHistory({ historyDetail, historyData }) {
  return (
    <div className={styles.historyWrapper}>
      {historyData?.map((item, index) => {
        return (
          <div className={styles.interviewWrapper} key={`historyCard_${index}`}>
            <div className={styles.titleWrapper}>
              <div>
                <div className={styles.title}>
                  {" "}
                  Summary -{" "}
                  <Link
                    to={`/job/openings/details/${item?.job_openings?.id}`}
                    target="_blank"
                    style={{ color: "#2896e9" }}
                  >
                    <span>{item?.job_openings?.code}</span>
                  </Link>
                </div>
                <div className={styles.newLine} />
              </div>
              <div>
                <StatusPill status={item?.job_openings?.status} />
              </div>
            </div>
            <SummaryView
              status={item?.cv_shortlist}
              title="CV Shortlist"
              statustitle="CV Final Status :"
              cvList={item?.cv_shortlist_feedback}
            />
            <SummaryView
              status={item?.status}
              title="Interview Feedback"
              statustitle="Interview Final Status:"
              InterviewList={item?.interview_feedback}
              rating={item?.rating}
              date={item?.status_updated_on}
            />
            
          </div>
        );
      })}

      <EventDetails data={historyDetail} />
    </div>
  );
}

export default InterviewHistory;
