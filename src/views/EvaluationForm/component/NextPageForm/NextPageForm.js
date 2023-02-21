import { ButtonBase, Checkbox } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import CandidateInfo from "../CandidateInfo/CandidateInfo";
import PasswordDialog from "../PasswordPopUp/PasswordDialog.view";
import PerformanceShortlistView from "../PerformanceShortlistView/PerformanceShortlistView";
import styles from "./Style.module.css";
function NextPageForm() {
  const [isResetDialog, setIsResetDialog] = useState(false);
  const toggleResetDialog = useCallback(() => {
    setIsResetDialog((e) => !e);
  }, [isResetDialog]);
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
            <CandidateInfo />
          </div>
          <div className={styles.candidateInfoContainer2}>
            <PerformanceShortlistView
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
                    //  checked={val.is_mandatory}
                    //  onChange={(e) => this._handleMenuClick(e,index)}
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
              />
              <div className={styles.btnContainer}>
                <div className={styles.btnCont1}>
                  <ButtonBase className={styles.edit}>PREVIOUS</ButtonBase>
                  <ButtonBase
                    type={"button"}
                    onClick={toggleResetDialog}
                    className={styles.createBtn}
                  >
                    SUBMIT
                  </ButtonBase>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextPageForm;
