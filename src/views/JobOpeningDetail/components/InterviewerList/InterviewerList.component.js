import React from 'react';
import styles from "../../Style.module.css";
import {ButtonBase} from "@material-ui/core";
import InterviewerRecordTable from "./InterviewerTable/InterviewerTable.component";
import CandidateTable from "../../../../components/CandidateDataTable/CandidateTable.component";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import useInterviewerList from "./InterviewerListHook";
import InterviewerFormComponent from "./InterviewerForm/InterviewerForm.component";

const InterviewerListComponent = ({jobId,isInterviewStatus,handleChangeInterviewStatus,status}) => {
    const {toggleSidePanel, isPanel, } = useInterviewerList({jobId});
    return (
        <div className={styles.plainPaper}>
            <div className={styles.btmFlex}>
                <div style={{ flex: "1" }}>
                    <div className={styles.heading}> Interview Panel</div>
                </div>
                    <div style={{ marginLeft: "20px" }}>
                    <ButtonBase onClick={toggleSidePanel}  
                    disabled={status === "CLOSED" ? true : false}
                    className={
                      status === "CLOSED" ? styles.disabledBtn : styles.createBtn
                    }>
                        MODIFY INTERVIEW PANEL
                    </ButtonBase>
                </div>
            </div>
            <InterviewerRecordTable jobId={jobId} isInterviewStatus={isInterviewStatus} handleChangeInterviewStatus={handleChangeInterviewStatus} />
            <SidePanelComponent
                handleToggle={toggleSidePanel}
                title={'Add/Edit Interviewer'}
                open={isPanel}
                side={'right'}>
                <InterviewerFormComponent handleSubmit={toggleSidePanel} jobId={jobId} />
            </SidePanelComponent>
        </div>
    );
};

export default InterviewerListComponent;
