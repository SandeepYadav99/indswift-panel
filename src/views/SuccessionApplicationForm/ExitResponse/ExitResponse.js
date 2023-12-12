import { ButtonBase } from "@material-ui/core";
import React from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import styles from "./Style.module.css";
function ExitResponseSub({ location }) {
  const type = location?.state?.type;
  return (
    <div className={styles.FormSubmitWrapper}>
      <div className={styles.formSubmitContainer}>
        <div className={styles.formSubmitImageWrapper}>
          <img
            src={require("../../../assets/img/ic_successfully submited.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.formSubmitBottomWrapper}>
          <div className={styles.submitHeader}>
            <p>Successfully Submitted!</p>
          </div>

          <div className={styles.responseLower}>
            <span>Thanks for your submission.</span>
            <br />
            <span> You can now close this window </span>
          </div>

          <div>
            <div className={styles.btnContainer}>
              <div className={styles.btnCont1}>
                <ButtonBase
                  type={"button"}
                  onClick={() => {
                    historyUtils.push(RouteName.SUCCESSION_FORM);
                  }}
                  className={styles.createBtn}
                >
                  Close
                </ButtonBase>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExitResponseSub;
