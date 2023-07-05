import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";

const BottomActionView = ({ reviewers, employees, isSubmitting, handleSend }) => {
  return (
    <div className={styles.stickyBtnWrap}>
      <div className={styles.WrapOuter}>
        <div className={styles.upperWrap}>
          <span>
            REVIEWERS: <span className={styles.upperNum}>{reviewers}</span>
          </span>
          <span>
            EMPLOYEES: <span className={styles.upperNum}>{employees}</span>
          </span>
        </div>
        <div className={styles.btnWrap}>
          <ButtonBase
              disabled={isSubmitting}
            aria-haspopup="true"
              onClick={handleSend}
            className={"createBtn"}
          >
            SEND REVIEW FORM
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default BottomActionView;
