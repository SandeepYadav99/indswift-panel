import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Style.module.css";
import {ButtonBase, Menu, MenuItem} from "@material-ui/core";
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

const JobOpeningDetail = () => {
  const { data, isLoading, handleAddCandidate, candidateEl, handleCloseCandidateEl, handleCandidateMenu,
    toggleCandidatePanel, isCandidatePanel, id } = useJobOpeningDetail({});
  if (isLoading) {
    return <WaitingComponent />;
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
                {data.location.name}
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
                <span className={styles.value}>RAP ID:</span>
                {data.code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Vacancy Type:</span>
                {data.vacancy_type}
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
                <span className={styles.value}>RAP Date:</span>
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

      <div className={styles.plainPaper}>
        <div className={styles.btmFlex}>
          <div style={{ flex: "1" }}>
            <div className={styles.heading}>Candidates List</div>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <ButtonBase  aria-owns={candidateEl ? 'candidateEl' : undefined}
                         aria-haspopup="true" onClick={handleAddCandidate} className={styles.createBtn}>Add Candidate</ButtonBase>
            <Menu
                id="candidateEl"
                anchorEl={candidateEl}
                open={Boolean(candidateEl)}
                onClose={handleCloseCandidateEl}
            >
              <MenuItem onClick={() => {handleCandidateMenu('CREATE')}}>Create Candidate</MenuItem>
              <MenuItem onClick={() => {handleCandidateMenu('ASSOCIATE')}}>Associate Candidate</MenuItem>
            </Menu>
          </div>
        </div>
        <CandidatesRecordTable jobId={id} />
      </div>
      <InterviewerListComponent jobId={id} />
      <SidePanelComponent
          handleToggle={toggleCandidatePanel}
          title={'Candidates List'}
          open={isCandidatePanel}
          side={'right'}>
        <CandidateTable />
      </SidePanelComponent>
    </div>
  );
};

export default JobOpeningDetail;
