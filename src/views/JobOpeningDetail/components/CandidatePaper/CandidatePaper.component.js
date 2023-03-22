import styles from "../../Style.module.css";
import {ButtonBase, Menu, MenuItem} from "@material-ui/core";
import CandidatesRecordTable from "../CandidatesTable/CandidatesTable.component";
import React from "react";
import useCandidatePaper from "./CandidatePaper.hook";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import CandidateTable from "../../../../components/CandidateDataTable/CandidateTable.component";
import CandidateShortlistTable
    from "../../../../components/CandidateShortlistDataTable/CandidateShortlistTable.component";
import CandidateInterviewTable
    from "../../../../components/CandidateInterviewDataTable/CandidateInterviewTable.component";


const CandidatePaperComponent = ({jobId, isRecurring}) => {
    const {  handleAddCandidate,
        candidateEl,
        handleCloseCandidateEl,
        handleCandidateMenu,
        handleCandidateInterviewMenu,
        handleCandidateShortlistMenu,
        toggleCandidatePanel,
        isCandidatePanel,
        isCandidateInterviewPanel,
        isCandidateShortlistPanel,
        toggleCandidateInterviewPanel,
        toggleCandidateShortlistPanel,
    } = useCandidatePaper({jobId});
    return (
        <div className={styles.plainPaper}>
            <div className={styles.btmFlex}>
                <div style={{ flex: "1" }}>
                    <div className={styles.heading}>Candidates List</div>
                </div>
                <div style={{ marginLeft: "20px" }}>
                    <ButtonBase
                        aria-owns={candidateEl ? "candidateEl" : undefined}
                        aria-haspopup="true"
                        onClick={handleAddCandidate}
                        className={styles.createBtn}
                    >
                        Add Candidate
                    </ButtonBase>
                    <Menu
                        id="candidateEl"
                        anchorEl={candidateEl}
                        open={Boolean(candidateEl)}
                        onClose={handleCloseCandidateEl}
                    >
                        <MenuItem
                            onClick={() => {
                                handleCandidateMenu("CREATE");
                            }}
                        >
                            Create Candidate
                        </MenuItem>
                        {/* <MenuItem
                onClick={() => {
                  handleCandidateMenu("ASSOCIATE");
                }}
              >
                Associate Candidate
              </MenuItem> */}
                    </Menu>
                </div>
            </div>
            <CandidatesRecordTable
                jobId={jobId}
                filterWidth={true}
                handleCandidateMenu={handleCandidateMenu}
                handleInterviewSidepanel={handleCandidateInterviewMenu}
                handleShortlistSidepanel={handleCandidateShortlistMenu}
            />
            <SidePanelComponent
                handleToggle={toggleCandidatePanel}
                title={"Candidates List"}
                open={isCandidatePanel}
                side={"right"}
            >
                <CandidateTable />
            </SidePanelComponent>
            <SidePanelComponent
                handleToggle={toggleCandidateShortlistPanel}
                title={"Shortlist Candidates"}
                open={isCandidateShortlistPanel}
                side={"right"}
            >
                <CandidateShortlistTable handleClose={toggleCandidateShortlistPanel} jobId={jobId} />
            </SidePanelComponent>
            <SidePanelComponent
                handleToggle={toggleCandidateInterviewPanel}
                title={"Schedule Interview"}
                open={isCandidateInterviewPanel}
                side={"right"}
            >
                <CandidateInterviewTable isRecurring={isRecurring}  jobId={jobId} handleClose={toggleCandidateInterviewPanel} />
            </SidePanelComponent>
        </div>
    )
};

export default CandidatePaperComponent;
