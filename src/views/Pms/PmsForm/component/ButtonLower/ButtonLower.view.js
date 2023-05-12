import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import historyUtils from "../../../../../libs/history.utils";

const ButtonLowerView = ({ handleSubmit, isSubmitting, handleDraft }) => {
  return (
    <div className={styles.stickyBtnWrap}>
      <div className={styles.upperWrap}>
        <ButtonBase onClick={() => { historyUtils.goBack(); }} className={styles.edit}>Go Back</ButtonBase>
      </div>
      <div className={styles.btnWrap}>
        <ButtonBase className={styles.edit} disabled={isSubmitting} onClick={handleDraft}>SAVE AS DRAFT</ButtonBase>

        <ButtonBase
            disabled={isSubmitting}
          aria-haspopup="true"
            onClick={handleSubmit}
          className={"createBtn"}
        >
          Submit
        </ButtonBase>
      </div>
    </div>
  );
};

export default ButtonLowerView;
