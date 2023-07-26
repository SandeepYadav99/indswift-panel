import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import styles from "./Style.module.css";
function LoanOfferView({ children, toggleDialog, handleReject, isSubmitting, isEnabled }) {
  return (
    <div className={styles.PdfViewWrapper}>
      <div className={styles.innerPdfCont}>
        {children}
        {isEnabled && (<div className={styles.PdfBtnWrapper}>
          <div className={styles.editBtn2}>
            <ButtonBase disabled={isSubmitting} onClick={handleReject} className={styles.edit}>
              REJECT
            </ButtonBase>
          </div>
          <div>
            <ButtonBase
                disabled={isSubmitting}
              className={styles.createBtn}
              onClick={() => {toggleDialog()}}
            >
              ACCEPT
            </ButtonBase>
          </div>
        </div>)}
      </div>
    </div>
  );
}

export default LoanOfferView;
