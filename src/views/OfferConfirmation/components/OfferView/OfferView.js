import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";
import styles from "./Style.module.css";
function OfferViewer({ children, toggleDialog }) {
  return (
    <div className={styles.PdfViewWrapper}>
      <div className={styles.innerPdfCont}>
        {children}
        <div className={styles.PdfBtnWrapper}>
          <div className={styles.editBtn2}>
            <ButtonBase className={styles.edit}>
              REJECT
            </ButtonBase>
          </div>
          <div>
            <ButtonBase
              className={styles.createBtn}
              onClick={() => {toggleDialog()}}
            >
              ACCEPT
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferViewer;
