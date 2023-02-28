import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "./Style.module.css";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";
function SubmitEvaluationForm() {
  return (
    <div className={styles.FormSubmitWrapper}>
      <div className={styles.formSubmitContainer}>
        <div className={styles.formSubmitImageWrapper}>
          <img
            src={require("../../../../assets/img/ic_successfully submited.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.formSubmitBottomWrapper}>
          <div className={styles.submitHeader}>
            <p>Successfully Submitted!</p>
          </div>
          <div className={styles.submitDescription}>
            <p>
            Thanks for your submission. <br/>You can now close this window
            </p>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
            //   onClick={handleSubmit}
            //   disabled={isSubmitting}
              className={"createBtnreset"}
              onClick={() => {
                historyUtils.push(RouteName.INTERVIEW_SCHEDULE);
              }}
            >
              close
            </ButtonBase>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SubmitEvaluationForm;
