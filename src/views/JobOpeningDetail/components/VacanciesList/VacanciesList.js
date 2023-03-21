import React from "react";
import {ButtonBase, Menu, MenuItem} from "@material-ui/core";
import styles from "./Style.module.css";
import VacanciesListHook from "./VacanciesListHook";
import VacanciesDialog from "./VacanciesPopUp/VacanciesDialog.view";
import NewPositionDialog from "./NewPositionPopUp/NewPositionDialog.view";
import VacanciesTable from "./VacanciesTable/VacanciesTable.compoent";

function VacanciesList({jobId, prc}) {
    const {
        handleCandidateMenu,
        toggleReplaceDialog,
        isReplacingPopUp,
        isNewPosition,
        togglePositionDialog,
        handleAddCandidate,
        candidateEl,
        handleCloseCandidateEl,
        handleSubmit
    } = VacanciesListHook({jobId});

    return (
        <div className={styles.plainPaper}>
            <div className={styles.btmFlex}>
                <div style={{flex: "1"}}>
                    <div className={styles.heading}>Vacancies</div>
                </div>
                <VacanciesDialog
                    jobId={jobId}
                    isOpen={isReplacingPopUp}
                    handleToggle={toggleReplaceDialog}
                    handleSubmit={handleSubmit}
                />
                <NewPositionDialog
                    jobId={jobId}
                    prc={prc}
                    isOpen={isNewPosition}
                    handleToggle={togglePositionDialog}
                    handleSubmit={handleSubmit}
                />
                <div style={{marginLeft: "20px"}}>
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
            <VacanciesTable jobId={jobId}/>
        </div>
    );
}

export default VacanciesList;
