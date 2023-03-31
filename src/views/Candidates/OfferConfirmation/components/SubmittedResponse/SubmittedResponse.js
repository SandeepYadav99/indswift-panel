import { ButtonBase } from "@material-ui/core";
import React from "react";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";
import styles from "./Style.module.css";
function SubmittedResponse({ location }) {
  const type = location?.state?.type;
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
            <p>Response Recorded!</p>
          </div>
          <div className={styles.submitDescription}>
            <p>
              You have <strong>{type}</strong> the Offer letter
            </p>
          </div>
          <div className={styles.responseLower}>
            <span>Thanks for your response.</span>
            <br />
            <span> You can reach out to the HR for further assistance. </span>
          </div>
          <div>
            <div className={styles.btnContainer}>
              <div className={styles.btnCont1}>
                <ButtonBase
                  type={"button"}
                  onClick={() => {
                    historyUtils.push(RouteName.OFFER_LOGIN);
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

export default SubmittedResponse;
