import React from "react";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import VacanciesListHook from "./VacanciesListHook";
import VacanciesDialog from "./VacanciesPopUp/VacanciesDialog.view";
import NewPositionDialog from "./NewPositionPopUp/NewPositionDialog.view";
import VacanciesTable from "./VacanciesTable/VacanciesTable.compoent";

function VacanciesList() {
  const {
    handleCandidateMenu,
    toggleReplaceDialog,
    isReplacingPopUp,
    isNewPosition,
    togglePositionDialog,
    handleAddCandidate,
    candidateEl,
    handleCloseCandidateEl,
  } = VacanciesListHook({});
  return (
    <div className={styles.plainPaper}>
      <div className={styles.btmFlex}>
        <div style={{ flex: "1" }}>
          <div className={styles.heading}>Vacancies </div>
        </div>
        <VacanciesDialog
          isOpen={isReplacingPopUp}
          handleToggle={toggleReplaceDialog}
        />
        <NewPositionDialog
          isOpen={isNewPosition}
          handleToggle={togglePositionDialog}
        />
        <div style={{ marginLeft: "20px" }}>
          <ButtonBase
             onClick={handleAddCandidate}
            aria-owns={candidateEl ? "candidateVacancy" : undefined}
            aria-haspopup="true"
            className={styles.createBtn}
          >
            ADD VACANCY
          </ButtonBase>
          <Menu 
          id="candidateVacancy"
          anchorEl={candidateEl}
          open={Boolean(candidateEl)}
          onClose={handleCloseCandidateEl}
          >
            <MenuItem
              onClick={() => {
                handleCandidateMenu("NEW");
              }}
            >
              New Position
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCandidateMenu("REPLACING");
              }}
            >
              Replacing Person
            </MenuItem>
          </Menu>
        </div>
      </div>
      <VacanciesTable/>
      {/* <InterviewerRecordTable jobId={jobId} isInterviewStatus={isInterviewStatus} handleChangeInterviewStatus={handleChangeInterviewStatus} /> */}
    </div>
  );
}

export default VacanciesList;
