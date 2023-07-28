import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";

const BottomIncActionView = ({ isSubmitting, handleSend, employees }) => {
  return (
    <div className={styles.stickyBtnWrap}>
      <div className={styles.WrapOuter}>
        <div className={styles.upperWrap}>
          <span>
            EMPLOYEES: <strong>{employees}</strong>
          </span>
        </div>
        <div className={styles.btnWrap}>
          <ButtonBase
            disabled={isSubmitting}
            aria-haspopup="true"
            onClick={handleSend}
            className={"createBtn"}
          >
            SEND INCREMENT LETTER
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default BottomIncActionView;
