import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";
import styles from "./Style.module.css";
function PdfViewer({ children, handleToggle }) {
  return (
    <div className={styles.PdfViewWrapper}>
      <div className={styles.innerPdfCont}>
        <div className={styles.topWrapper}>
          <Close
            onClick={() => handleToggle()}
            style={{ color: "#ffffff", marginLeft: "30px", cursor: "pointer" }}
          />
        </div>
        {children}
        <div className={styles.PdfBtnWrapper}>
          <div className={styles.editBtn2}>
            <ButtonBase className={styles.edit} onClick={() => handleToggle()}>
              CANCEL
            </ButtonBase>
          </div>
          <div>
            <ButtonBase
              className={styles.createBtn}
              onClick={() => {
                historyUtils.push(RouteName.CANDIDATES_SUCCESS);
              }}
            >
              share with candidate
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;
