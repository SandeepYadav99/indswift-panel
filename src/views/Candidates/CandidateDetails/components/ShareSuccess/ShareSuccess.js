import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "./Style.module.css";
function ShareSuccess() {
  return (
    <div className={styles.FormSubmitWrapper}>
      <div className={styles.formSubmitContainer}>
        <div className={styles.formSubmitImageWrapper}>
          <img
            src={require("../../../../../assets/img/ic_successfully submited.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.formSubmitBottomWrapper}>
          <div className={styles.submitHeader}>
            <p>Offer Letter Shared!</p>
          </div>
          <div className={styles.responseLower}>
            <span>
              {" "}
              Offer letter has been successfully shared with the candidate
            </span>
          </div>
          <div>
            <div className={styles.btnContainer}>
              <span>Go to Candidate Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareSuccess;
