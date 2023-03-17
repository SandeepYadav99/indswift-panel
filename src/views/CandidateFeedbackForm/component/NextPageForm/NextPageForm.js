import { ButtonBase, Checkbox } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import CandidateInfo from "../CandidateInfo/CandidateInfo";
import PasswordDialog from "../PasswordPopUp/PasswordDialog.view";
import PerformanceShortlistView from "../PerformanceShortlistView/PerformanceShortlistView";
import NextPageHook from "./NextPageHook";
import styles from "./Style.module.css";
import SnackbarComponent from "../../../../components/Snackbar.component";
function NextPageForm({ data, handlePrev, isSubmitting, handleSubmit: handleSubmitProp }) {
  const {
    isResetDialog,
    form,
    errorData,
    toggleResetDialog,
    handleRatingChange,
    handleSubmit,
    isDeclarationChecked,
    handleDeclarationCheckbox,
    handlePasswordVerified
  } = NextPageHook({handleSubmitProp, handlePrev});

  return (
    <div className={styles.evaluationFormWrapper}>
      <div>
        <div className={styles.logoImg}>
          <img
            src={require("../../../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Interview Evaluation Form</h1>
          <div className={styles.newLine} />
        </div>
        <div className={styles.evaluationContainer}>
          <div className={styles.candidateInfoContainer2}>
            <CandidateInfo data={data} />
          </div>
          <div className={styles.candidateInfoContainer2}>
            <PerformanceShortlistView
              handleChange={handleRatingChange}
              type="overall"
              title="Overall Impression and Recommendation"
              question=" Summary of your perceptions of the candidate’s strengths/weaknesses. Final comments and recommendations for proceeding with the candidate."
            />
          </div>
          <div className={styles.candidateInfoContainer2}>
            <div className={styles.delcarationWrapper}>
              <div className={"DeclarationHeading"}>Declaration</div>
              <div className={styles.discriptionWrap}>
                <div className={styles.checkboxWrapper}>
                  <Checkbox
                    style={{ padding: 0, marginRight: "10px" }}
                    name={"is_mandatory"}
                     checked={isDeclarationChecked}
                     onChange={handleDeclarationCheckbox}
                  />
                  <div>
                    <span>
                      I solemnly declare that all the particulars furnished in
                      this form are true and correct to the best of my knowledge
                      and belief.
                    </span>
                  </div>
                </div>
              </div>
              <PasswordDialog
                isOpen={isResetDialog}
                handleToggle={toggleResetDialog}
                handleVerify={handlePasswordVerified}
              />
              <div className={styles.btnContainer}>
                <div className={styles.btnCont1}>
                  <div style={{visibility:'hidden'}}>
                    <ButtonBase disabled={isSubmitting} onClick={handlePrev} className={styles.edit}>PREVIOUS</ButtonBase>
                    </div>
                  <ButtonBase
                      disabled={!isDeclarationChecked || isSubmitting}
                    type={"button"}
                    onClick={handleSubmit}
                    className={ !isDeclarationChecked || isSubmitting ? styles.disabledBtn :styles.createBtn}
                  >
                    SUBMIT
                  </ButtonBase>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SnackbarComponent />
    </div>
  );
}

export default NextPageForm;
