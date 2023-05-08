import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";

const BottomActionView = () => {
  return (
    <div className={styles.stickyBtnWrap}>
      <div className={styles.WrapOuter}>
        <div className={styles.upperWrap}>
          <span>
            REVIEWERS: <span className={styles.upperNum}>32</span>
          </span>
          <span>
            EMPLOYEES: <span className={styles.upperNum}>32</span>
          </span>
        </div>
        <div className={styles.btnWrap}>
          <ButtonBase
            aria-haspopup="true"
            //   onClick={}
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
