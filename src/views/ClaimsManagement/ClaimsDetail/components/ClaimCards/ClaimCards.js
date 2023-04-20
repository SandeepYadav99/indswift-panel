import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "./Style.module.css";

function ClaimCards({ title, subtitle, handleClick, enableBtn }) {
  return (
    <div className={styles.claimCardWrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{title}</div>
        <div>{subtitle}</div>
      </div>
      <div>
        {enableBtn && (
          <ButtonBase
            type={"button"}
            className={styles.createBtn}
            onClick={handleClick}
          >
            RAISE CLAIM
          </ButtonBase>
        )}
      </div>
    </div>
  );
}

export default ClaimCards;
