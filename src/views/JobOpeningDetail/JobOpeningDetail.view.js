import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Style.module.css";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import classnames from "classnames";
import CandidatesRecordTable from "./components/CandidatesTable/CandidatesTable.component";
import InterviewerRecordTable from "./components/InterviewerList/InterviewerTable/InterviewerTable.component";
import useJobOpeningDetail from "./JobOpeningDetail.hook";
import { WaitingComponent } from "../../components/index.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import CandidateTable from "../../components/CandidateDataTable/CandidateTable.component";
import InterviewerListComponent from "./components/InterviewerList/InterviewerList.component";
import CandidateInterviewTable from "../../components/CandidateInterviewDataTable/CandidateInterviewTable.component";
import CandidateShortlistTable from "../../components/CandidateShortlistDataTable/CandidateShortlistTable.component";
import CandidatePaperComponent from "./components/CandidatePaper/CandidatePaper.component";

const JobOpeningDetail = () => {
  const { data, isLoading, id } = useJobOpeningDetail({});
  if (isLoading) {
    return <WaitingComponent />;
  }
  const valencyChange=(value)=>{
    return value ? value.replace(/_/, " "): "NA"
  }
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Job Openings</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Job Information -</div>

            <div className={styles.editBtn}>
              <ButtonBase className={styles.edit}>EDIT</ButtonBase>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data.location.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                {data.department.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Sub-Department:</span>
                {data.sub_department.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                {data.designation.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Grade:</span>
                {data.grade.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Cadre:</span>
                {data?.cadre?.name ? data?.cadre?.name : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value} style={{ width: "190px" }}>
                  Status:
                </span>
                <span className={classnames("status", "success")}>
                  {data.status}
                </span>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>PRC:</span>
                {data.code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Vacancy Type:</span>
                {valencyChange(data.vacancy_type)}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Employee ID:</span>
                {data.replacing_person.code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Employee Name:</span>
                {data.replacing_person.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Indent Date:</span>
                {data.createdAtText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Assigned To:</span>
                {data.assigned_person.name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CandidatePaperComponent jobId={id} />
      <InterviewerListComponent jobId={id} />
    </div>
  );
};

export default JobOpeningDetail;
