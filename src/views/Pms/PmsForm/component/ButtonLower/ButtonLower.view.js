import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";

const ButtonLowerView = () => {
  return (
    <div className={styles.stickyBtnWrap}>
      <div className={styles.upperWrap}>
        <ButtonBase className={styles.edit}>Go Back</ButtonBase>
      </div>
      <div className={styles.btnWrap}>
        <ButtonBase className={styles.edit}>SAVE AS DRAFT</ButtonBase>

        <ButtonBase
          aria-haspopup="true"
          //   onClick={}
          className={"createBtn"}
        >
          Submit
        </ButtonBase>
      </div>
    </div>
  );
};

export default ButtonLowerView;
