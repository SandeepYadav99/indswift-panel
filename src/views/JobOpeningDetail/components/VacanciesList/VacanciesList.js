import React from "react";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import VacanciesListHook from "./VacanciesListHook";
import VacanciesDialog from "./VacanciesPopUp/VacanciesDialog.view";

function VacanciesList() {
  const { handleCandidateMenu, toggleReplaceDialog, isReplacingPopUp } =
    VacanciesListHook({});
  return (
    <div className={styles.plainPaper}>
      <div className={styles.btmFlex}>
        <div style={{ flex: "1" }}>
          <div className={styles.heading}>Vacancies </div>
        </div>
        <VacanciesDialog
                isOpen={isReplacingPopUp}
                handleToggle={toggleReplaceDialog}
                // handleVerify={handlePasswordVerified}
              />
        <div style={{ marginLeft: "20px" }}>
          <ButtonBase
            //  onClick={toggleSidePanel
            className={styles.createBtn}
          >
            ADD VACANCY
          </ButtonBase>
          <Menu>
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
              Replecing Person
            </MenuItem>
          </Menu>
        </div>
      </div>
      {/* <InterviewerRecordTable jobId={jobId} isInterviewStatus={isInterviewStatus} handleChangeInterviewStatus={handleChangeInterviewStatus} /> */}
    </div>
  );
}

export default VacanciesList;
