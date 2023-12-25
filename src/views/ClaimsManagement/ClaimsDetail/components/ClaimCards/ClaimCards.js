import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "./Style.module.css";

function ClaimCards({ title, subtitle, handleClick, enableBtn ,isLoan}) {
  return (
    <div className={styles.claimCardWrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{title}</div>
        <div>{subtitle}</div>
      </div>
      <div className={styles.btnWrap}>
        {enableBtn && (
          <ButtonBase
            type={"button"}
            className={styles.createBtn}
            onClick={handleClick}
          >
            {isLoan ? "RAISE REQUEST" : "RAISE CLAIM"}
          </ButtonBase>
        )}
      </div>
    </div>
  );
}

export default ClaimCards;
